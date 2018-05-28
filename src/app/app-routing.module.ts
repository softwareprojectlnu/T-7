import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './guards/auth-guard.service';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {OrdersComponent} from './orders/orders.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminProductFormComponent} from './admin/admin-add-product/admin-add-product.component';
import {ProductsComponent} from './products/products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {ProductPageComponent} from './product-page/product-page.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'app-product-page/:key', component: ProductPageComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/add',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:key',
    component: AdminProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },

  {path: 'access-denied', component: AccessDeniedComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

