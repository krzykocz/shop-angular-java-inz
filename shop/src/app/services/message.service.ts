import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllOrderMessages(id) {
    return this.http.get(this.url + '/order/' + id + '/message?sort=createdAt,asc');
  }

  createMessageForOrder(message, orderId) {
    return this.http.post(this.url + '/order/' + orderId + '/message', message);
  }
}
