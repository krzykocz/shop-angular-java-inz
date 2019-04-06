import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageTranslationModule} from './shared/modules/language-translation/language-translation.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {AuthService} from './services/auth/auth.service';
import {AuthInterceptor} from './services/auth/auth.interceptor';
import {CategoryService} from './services/category.service';
import {ManufacturerService} from './services/manufacturer.service';
import {OrderService} from './services/order.service';
import {ProductService} from './services/product.service';
import {UserService} from './services/user.service';
import {JwtHelper} from 'angular2-jwt';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [AppComponent],
  providers: [AuthGuard, AuthService, CategoryService, ManufacturerService, OrderService, ProductService, UserService, JwtHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
