///<reference path="../models/orderp.ts"/>
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {CartItem, ShoppingCart, ShoppingCartService} from '../services/shopping-cart.service';
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
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  key: string;
  an: any[] = [];
  ordered: orderp = <orderp> {};
  items$: Observable<CartItem[]>;
  ite: CartItem = <CartItem> {};
  cartTotal$: Observable<number>;
  product: Product = <Product>{};
  uidd: string;
  nu: number;
  lim: number;

  constructor(public productService: ProductService, private cart: ShoppingCartService, private router: Router,
              private ord: OrderService, private route: ActivatedRoute, private user: UserService, public af: AngularFireAuth) {
    this.items$ = cart.getItems();
    this.an = cart.getarrayitems();
    this.nu = 0;
    this.lim = 0;


    this.cartTotal$ = this.items$.switchMap(items => {
      this.lim += 1;
      return Observable.from(items).mergeMap(line => {
        return this.productService.fromRef(line.product).take(1).map(product => product.price * line.amount);
      }).reduce((acc, x) => acc + x, 0);
    });

    this.af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.uidd = user.uid;

        }
      }
    );
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

  updateItem(product: firebase.firestore.DocumentReference, amount: number) {
    this.cart.setItemfinal(product.id, +amount);
    this.nu += 1;
  }

  checkout() {
    console.log(this.lim);
    const order = this.ordered;
    order.id = this.uidd;

    order.products = this.an;
    this.ord.save(order);
    // this.cart.remove(this.route.snapshot.paramMap.get('key'));
    this.router.navigateByUrl('');
  }

  trackByFn(index, item: CartItem) {
    return item.product != null ? item.product.id : null;
  }
}
