import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {ProductCardComponent} from '../product-card/product-card.component';

@Component({
  selector: 'app-productt',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products$: Observable<Product[]>;
  product: Observable<Product>;
  productt: Product;

  constructor(public productService: ProductService, public proClass: ProductCardComponent) {
    this.productt = proClass.product;

//   console.log('the title is: ' + this.proClass.title1);



    //  this.products$ = productService.getAll();

//   this.productt =  productService.singleProduct;
  }

  ngOnInit() {
  }

}
