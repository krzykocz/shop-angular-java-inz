import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url + '/manufacturer');
  }

  get(id) {
    return this.http.get(this.url + '/manufacturer/' + id);
  }

  create(data) {
    return this.http.post(this.url + '/manufacturer', data);
  }

  update(id, data) {
    return this.http.put(this.url + '/manufacturer/' + id, data);
  }
}
