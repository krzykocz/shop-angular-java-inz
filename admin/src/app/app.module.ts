import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import {JwtHelper} from 'angular2-jwt';
import {OrderService} from './services/order.service';
import {CategoryService} from './services/category.service';
import {ManufacturerService} from './services/manufacturer.service';
import {ProductService} from './services/product.service';
import {UserService} from './services/user.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './pages/components/nav/nav.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { ProductComponent } from './pages/product/product.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductCreateUpdateComponent } from './pages/product/product-create-update/product-create-update.component';
import { CategoryCreateUpdateComponent } from './pages/category/category-create-update/category-create-update.component';
import { UserCreateUpdateComponent } from './pages/user/user-create-update/user-create-update.component';
import {JsonFilterByPipe} from './pipes/json-filter-by.pipe';
import { ManufacturerCreateUpdateComponent } from './pages/manufacturer/manufacturer-create-update/manufacturer-create-update.component';
import { OrderUpdateComponent } from './pages/order/order-update/order-update.component';
import {MessageService} from './services/message.service';
import { DirectorOrderComponent } from './pages/director-order/director-order.component';
import {ChecklistModule} from 'angular-checklist';

@NgModule({
  declarations: [
    JsonFilterByPipe,
    AppComponent,
    LoginComponent,
    PagesComponent,
    NavComponent,
    SidebarComponent,
    ProductComponent,
    FooterComponent,
    UserComponent,
    CategoryComponent,
    ManufacturerComponent,
    OrderComponent,
    ProductCreateUpdateComponent,
    CategoryCreateUpdateComponent,
    UserCreateUpdateComponent,
    ManufacturerCreateUpdateComponent,
    OrderUpdateComponent,
    DirectorOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ChecklistModule
  ],
  providers: [JwtHelper, CategoryService, ManufacturerService, OrderService, ProductService, UserService, MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
