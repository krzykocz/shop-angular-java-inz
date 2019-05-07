import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll(page: number = 0, size: number = 20) {
    return this.http.get(this.url + '/product?size=' + size + '&page=' + page);
  }

  getAllProductsByCategoryId(id) {
    return this.http.get(this.url + '/category/' + id + '/products');
  }

  getAllProductsWithCountLessThan(count) {
    return this.http.get(this.url + '/product/less/' + count);
  }

  get(id) {
    return this.http.get(this.url + '/product/' + id);
  }

  create(data) {
    return this.http.post(this.url + '/product', data);
  }

  update(id, data) {
    return this.http.put(this.url + '/product/' + id, data);
  }

  search(q: string) {
    return this.http.get(this.url + '/product/search?q=' + q);
  }
}

