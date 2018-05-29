import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subject} from 'rxjs/Subject';
import {Observable } from 'rxjs/Rx';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  private routeSub: Subscription;
  itemsInCart: number = 0;

  isCollapsed = true;
  user: AppUser;
  public isLoggedIn: boolean;
  public user_displayName: string;
  public sign_in: string;

  private notsearched: boolean;
  searchterm: string;
  startAt = new Subject();
  endAt = new Subject();
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  productss;

  lastKeypress = 0;


  constructor(private authService: AuthService, private router: Router, cart: ShoppingCartService, af: AngularFireAuth, private afs: AngularFirestore) {
    af.auth.onAuthStateChanged((user) => {
        if (user != null) {
          this.isLoggedIn = true;
          this.user_displayName = user.displayName;
          this.sign_in = 'Sign Out';

        } else {
          this.isLoggedIn = false;
          this.sign_in = 'Sign In';
        }
      }
    );
    authService.user$.subscribe(user => {
      this.user = user;
    });
    cart.getItems().subscribe(items => {
      this.itemsInCart = items.reduce((sum, value) => sum + value.amount, 0);
    });
  }
  ngOnInit() {
    Observable.combineLatest(this.startobs, this.endobs).subscribe((value) => {
      this.firequery(value[0], value[1]).subscribe((productss) => {
        this.productss = productss;
      });
    });
  }
  searchbt(){
    this.notsearched = false;
    const q = this.searchterm;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
  }
  search($event) {
    if ($event.timeStamp - this.lastKeypress > 200) {
      this.notsearched = false;
      const q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + "\uf8ff");
    }
    this.lastKeypress = $event.timeStamp;
    this.notsearched = true;

  }
  firequery(start, end) {
    return this.afs.collection('products', ref => ref.limit(10).orderBy('title').startAt(start).endAt(end)).valueChanges();
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['']));
  }
}
