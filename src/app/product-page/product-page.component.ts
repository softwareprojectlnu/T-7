import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {ActivatedRoute, convertToParamMap} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products$: Observable<Product[]>;
  product: Observable<Product>;
  pro: Product;
  constructor(public productService: ProductService, public route: ActivatedRoute) {
    // route.params.subscribe(para => {
    //   if (para.key) {
    //     this.pro = para;
    //   }
  //  })
    this.products$ = productService.getAll();
    this.product = productService.get(this.pro.key);
  }

  ngOnInit() {
  }

}
