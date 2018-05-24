import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {CartItem, ShoppingCartService} from '../services/shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {number} from 'ng2-validation/dist/number';
import {Product} from '../models/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  quantity: number;
  constructor(public product: ProductService, private cart: ShoppingCartService, private router: Router, private prod: ProductService) {
    this.items$ = cart.getItems();
    this.cartTotal$ = this.items$.switchMap(items => {
      return Observable.from(items).mergeMap(line => {
        return this.product.fromRef(line.product).take(1).map(product => product.price * line.amount);
      }).reduce((acc, x) => acc + x, 0);
    });
  }

  ngOnInit() {
  }

  trackByFn(index, item: CartItem) {
    return item.product != null ? item.product.id : null;
  }
  updateItem(product: firebase.firestore.DocumentReference, amount: number) {
    if (amount < 0) {amount = 0; }
      this.cart.setItem(product.id, +amount);
  }
  delete(product: firebase.firestore.DocumentReference) {
    this.cart.removeItem(product.id);
  }
  navigatetocheckout() {
    this.router.navigateByUrl('cart/checkout');
  }

}
