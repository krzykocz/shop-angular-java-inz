import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShopHomeComponent} from './components/shop-home/shop-home.component';
import {ProductDetailsComponent} from './components/shop-home/components/product-details/product-details.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AdminGuard} from './services/auth/admin.guard';
import {UserComponent} from './components/user/user.component';
import {CartComponent} from './components/shop-home/components/cart/cart.component';
import {OrdersComponent} from './components/user/components/orders/orders.component';
import {CheckoutComponent} from './components/shop-home/components/checkout/checkout.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminProductCreateUpdateComponent} from './components/admin/components/admin-product/admin-product-create-update/admin-product-create-update.component';
import {AdminManufacturerCreateUpdateComponent} from './components/admin/components/admin-manufacturer/admin-manufacturer-create-update/admin-manufacturer-create-update.component';
import {AdminCategoryCreateUpdateComponent} from './components/admin/components/admin-category/admin-category-create-update/admin-category-create-update.component';
import {AdminUserCreateUpdateComponent} from './components/admin/components/admin-user/admin-user-create-update/admin-user-create-update.component';
import {UserOrderDetailsComponent} from './components/user/components/orders/user-order-details/user-order-details.component';
import {AdminOrderUpdateComponent} from './components/admin/components/admin-order/admin-order-update/admin-order-update.component';
import {UserOrderComplaintComponent} from './components/user/components/orders/user-order-complaint/user-order-complaint.component';

const routes: Routes = [
  {path: '', component: ShopHomeComponent},
  {path: 'category/:id', component: ShopHomeComponent},
  {path: 'search', component: ShopHomeComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', redirectTo: 'user/orders'},
  {path: 'user/order/:id', component: UserOrderDetailsComponent, canActivate: [AuthGuard]},
  {path: 'user/complaint/:id', component: UserOrderComplaintComponent, canActivate: [AuthGuard]},
  {path: 'user/:page', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'checkout/:page', component: CheckoutComponent, canActivate: [AuthGuard]},
  // Admin pages
  {path: 'admin/product/:id', component: AdminProductCreateUpdateComponent, canActivate: [AdminGuard]},
  {path: 'admin/manufacturer/:id', component: AdminManufacturerCreateUpdateComponent, canActivate: [AdminGuard]},
  {path: 'admin/category/:id', component: AdminCategoryCreateUpdateComponent, canActivate: [AdminGuard]},
  {path: 'admin/user/:id', component: AdminUserCreateUpdateComponent, canActivate: [AdminGuard]},
  {path: 'admin/order/:id', component: AdminOrderUpdateComponent, canActivate: [AdminGuard]},
  {path: 'admin/:page', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'admin', redirectTo: 'admin/order'},


  // Rest pages
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
