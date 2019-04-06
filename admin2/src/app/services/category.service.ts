import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/category');
  }

  getAllProductsByCategory(id) {
    return this.http.get(this.url + '/category/' + id + '/products');
  }

  get(id) {
    return this.http.get(this.url + '/category/' + id);
  }

  create(data) {
    return this.http.post(this.url + '/category', data);
  }

  update(id, data) {
    return this.http.put(this.url + '/category/' + id, data);
  }
}
