import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {JwtHelper} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router, private jwtHelper: JwtHelper) {
  }

  canActivate() {
    const expectedRole = 'SELLER';
    const tokenPayload = this.jwtHelper.decodeToken(<string>this.authService.getToken());
    if (!this.authService.isAuthenticated() || tokenPayload.scopes[0].authority !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
