import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PagesComponent} from './pages/pages.component';
import {ProductComponent} from './pages/product/product.component';
import {UserComponent} from './pages/user/user.component';
import {CategoryComponent} from './pages/category/category.component';
import {ManufacturerComponent} from './pages/manufacturer/manufacturer.component';
import {OrderComponent} from './pages/order/order.component';
import {ProductCreateUpdateComponent} from './pages/product/product-create-update/product-create-update.component';
import {CategoryCreateUpdateComponent} from './pages/category/category-create-update/category-create-update.component';
import {UserCreateUpdateComponent} from './pages/user/user-create-update/user-create-update.component';
import {ManufacturerCreateUpdateComponent} from './pages/manufacturer/manufacturer-create-update/manufacturer-create-update.component';
import {OrderUpdateComponent} from './pages/order/order-update/order-update.component';
import {DirectorOrderComponent} from './pages/director-order/director-order.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: PagesComponent},
  // Product
  {path: 'product', component: ProductComponent},
  {path: 'product/less', component: ProductComponent},
  {path: 'product/:id', component: ProductCreateUpdateComponent},
  // User
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserCreateUpdateComponent},
  // Category
  {path: 'category', component: CategoryComponent},
  {path: 'category/:id', component: CategoryCreateUpdateComponent},
  // Manufacturer
  {path: 'manufacturer', component: ManufacturerComponent},
  {path: 'manufacturer/:id', component: ManufacturerCreateUpdateComponent},
  // Order
  {path: 'order', component: OrderComponent},
  {path: 'order/assign', component: DirectorOrderComponent},
  {path: 'order/assigned', component: DirectorOrderComponent},
  {path: 'order/allocated', component: OrderComponent},
  {path: 'order/unallocated', component: OrderComponent},
  {path: 'order/:id', component: OrderUpdateComponent}
  // {path: 'login', loadChildren: './login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
