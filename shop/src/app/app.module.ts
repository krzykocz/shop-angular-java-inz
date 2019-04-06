import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/shop-home/navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoryService} from './services/category.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TopbarComponent} from './components/shop-home/topbar/topbar.component';
import {ShopHomeComponent} from './components/shop-home/shop-home.component';
import {ProductService} from './services/product.service';
import {SidebarComponent} from './components/shop-home/components/sidebar/sidebar.component';
import {ProductListComponent} from './components/shop-home/components/product-list/product-list.component';
import {ProductDetailsComponent} from './components/shop-home/components/product-details/product-details.component';
import {AuthService} from './services/auth/auth.service';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {JwtHelper} from 'angular2-jwt';
import {CartService} from './services/cart.service';
import {UserComponent} from './components/user/user.component';
import {UserSidebarComponent} from './components/user/user-sidebar/user-sidebar.component';
import {UserDetailsComponent} from './components/user/components/user-details/user-details.component';
import {CartComponent} from './components/shop-home/components/cart/cart.component';
import {UserService} from './services/user.service';
import {OrdersComponent} from './components/user/components/orders/orders.component';
import {OrderService} from './services/order.service';
import {CheckoutComponent} from './components/shop-home/components/checkout/checkout.component';
import {AddressComponent} from './components/shop-home/components/checkout/components/address/address.component';
import {DeliveryComponent} from './components/shop-home/components/checkout/components/delivery/delivery.component';
import {PaymentComponent} from './components/shop-home/components/checkout/components/payment/payment.component';
import {ReviewComponent} from './components/shop-home/components/checkout/components/review/review.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminProductComponent} from './components/admin/components/admin-product/admin-product.component';
import {AdminManufacturerComponent} from './components/admin/components/admin-manufacturer/admin-manufacturer.component';
import {AdminCategoryComponent} from './components/admin/components/admin-category/admin-category.component';
import {AdminOrderComponent} from './components/admin/components/admin-order/admin-order.component';
import {AdminUserComponent} from './components/admin/components/admin-user/admin-user.component';
import {AdminSidebarComponent} from './components/admin/admin-sidebar/admin-sidebar.component';
import {AdminProductCreateUpdateComponent} from './components/admin/components/admin-product/admin-product-create-update/admin-product-create-update.component';
import {ManufacturerService} from './services/manufacturer.service';
import { AdminManufacturerCreateUpdateComponent } from './components/admin/components/admin-manufacturer/admin-manufacturer-create-update/admin-manufacturer-create-update.component';
import { AdminCategoryCreateUpdateComponent } from './components/admin/components/admin-category/admin-category-create-update/admin-category-create-update.component';
import { AdminUserCreateUpdateComponent } from './components/admin/components/admin-user/admin-user-create-update/admin-user-create-update.component';
import { UserOrderDetailsComponent } from './components/user/components/orders/user-order-details/user-order-details.component';
import { AdminOrderUpdateComponent } from './components/admin/components/admin-order/admin-order-update/admin-order-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    ShopHomeComponent,
    SidebarComponent,
    ProductListComponent,
    ProductDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    UserSidebarComponent,
    UserDetailsComponent,
    CartComponent,
    OrdersComponent,
    CheckoutComponent,
    AddressComponent,
    DeliveryComponent,
    PaymentComponent,
    ReviewComponent,
    AdminComponent,
    AdminProductComponent,
    AdminManufacturerComponent,
    AdminCategoryComponent,
    AdminOrderComponent,
    AdminUserComponent,
    AdminSidebarComponent,
    AdminProductCreateUpdateComponent,
    AdminManufacturerCreateUpdateComponent,
    AdminCategoryCreateUpdateComponent,
    AdminUserCreateUpdateComponent,
    UserOrderDetailsComponent,
    AdminOrderUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OrderService, UserService, CategoryService, ProductService, AuthService, JwtHelper, CartService, ManufacturerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
