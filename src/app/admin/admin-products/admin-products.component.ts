import {Subscription} from 'rxjs/Subscription';
import {Product} from './../../models/product';
import {Observable} from 'rxjs/Observable';
import {ProductService} from './../../services/product.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminProductFormComponent} from '../admin-add-product/admin-add-product.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {
  products$: Observable<Product[]>;
  product: Observable<Product>;

  constructor(public productService: ProductService) {
    this.products$ = productService.getAll();
  }

}
