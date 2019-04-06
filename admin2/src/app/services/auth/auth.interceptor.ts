import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.injector.get(AuthService);
    if (auth.getToken()) {
      const authToken = 'Bearer ' + auth.getToken();
      request = request.clone({
        setHeaders: {
          'Authorization': authToken
        }
      })
      ;
    }

    return next.handle(request);
  }
}
