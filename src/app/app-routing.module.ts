import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './guards/auth-guard.service';
import {CartComponent} from './cart/cart.component';
import {LoginComponent} from './login/login.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {AdminProductFormComponent} from './admin/admin-add-product/admin-add-product.component';
import {ProductsComponent} from './products/products.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import {CheckoutComponent} from './checkout/checkout.component';
import {AddressComponent} from './address/address.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin/orderp.ts',
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
  {path: 'cart/checkout', component: CheckoutComponent},
  {path: 'Address', component: AddressComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

