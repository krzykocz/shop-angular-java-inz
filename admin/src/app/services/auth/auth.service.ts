import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelper} from 'angular2-jwt';
import {Token} from './token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
  }

  authenticate(credentials) {
    return this.http.post(this.url + '/user/auth', {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      map((result: Token) => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      })
    );
  }

  create(credentials) {
    return this.http.post(this.url + '/user/create', credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return new JwtHelper().decodeToken(token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ? token : false;
  }

  isAuthenticated() {
    const token = this.getToken();
    return token ? (!this.jwtHelper.isTokenExpired(token) ? true : false) : false;
  }
}
