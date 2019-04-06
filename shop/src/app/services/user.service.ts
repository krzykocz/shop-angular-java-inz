import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080';


  constructor(private http: HttpClient) {
  }


  updateAuthenticatedUser(credentials) {
    return this.http.put(this.url + '/user/current', credentials);
  }

  getAll() {
    return this.http.get(this.url + '/user');
  }

  getUserById(id) {
    return this.http.get(this.url + /user/ + id);
  }

  updateUserById(id, data) {
    return this.http.put(this.url + '/user/' + id, data);
  }

  getAuthenticatedUser() {
    return this.http.get(this.url + '/user/current');
  }
}
