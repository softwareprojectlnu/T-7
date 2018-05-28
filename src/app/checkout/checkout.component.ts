import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {CartItem, ShoppingCartService} from '../services/shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {number} from 'ng2-validation/dist/number';
import {Product} from '../models/product';
import {orderp} from '../models/orderp';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {OrderService} from '../services/order.service';
import 'rxjs/add/operator/take';
import {AngularFireStorage} from 'angularfire2/storage';
import {unescapeIdentifier} from '@angular/compiler';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  key: string;
  ordered: orderp = <orderp> {};
  items$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  product: Product = <Product>{};

  constructor(public productService: ProductService, private cart: ShoppingCartService, private router: Router,
              private ord: OrderService, private route: ActivatedRoute, private user: UserService) {
    this.items$ = cart.getItems();

    this.cartTotal$ = this.items$.switchMap(items => {
      return Observable.from(items).mergeMap(line => {
        return this.productService.fromRef(line.product).take(1).map(product => product.price * line.amount);
      }).reduce((acc, x) => acc + x, 0);
    });
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.key = key;
      this.ord.get(key).take(1).subscribe(ordered => {
        this.ordered = ordered;
      });
    }
  }

  // trackByFn(index, item: CartItem) {
  //   return item.product != null ? item.product.id : null;
  // }

  checkout() {
    const order = this.ordered;
    order.id = this.user.get();

    this.ord.save(order);

    this.router.navigateByUrl('');
  }
}
