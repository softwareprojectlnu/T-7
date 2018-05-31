import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input('product') product: Product;
  subscription: Subscription;
  ordered = 0;
  public isLoggedIn: boolean;


  constructor(private cart: ShoppingCartService, af: AngularFireAuth) {
    af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.isLoggedIn = true;

        } else {
          this.isLoggedIn = false;
        }
      }
    ); }

  ngOnInit() {
    if (this.product.key) {
      this.subscription = this.cart.getItem(this.product.key).subscribe(cartItem => {
        if (cartItem !== null) { this.ordered = cartItem['amount']; }
      });
    }
  }
  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  increase() {
    if (this.isLoggedIn) {
        this.ordered++;
        this.amountChanged();
    }
  }
  decrease() {
      if (this.product.quantity > 0) {
        this.ordered--;
        this.amountChanged();
      }
    }
  amountChanged(){
  if (this.product.key) {
    this.cart.setItem(this.product.key, this.ordered);
  }
}
}
