import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://localhost:8080';


  constructor(private http: HttpClient) {
  }

  getAllUserOrders() {
    return this.http.get(this.url + '/user/order?sort=createdAt,desc');
  }

  getUserOrderById(id) {
    return this.http.get(this.url + '/user/order/' + id);
  }

  create(data) {
    return this.http.post(this.url + '/order/create', data);
  }

  getAllOrders(params = '?sort=createdAt,desc') {
    return this.http.get(this.url + '/order' + params);
  }

  getOrderById(id) {
    return this.http.get(this.url + '/order/' + id);
  }

  getOrderDetailsByOrderId(id) {
    return this.http.get(this.url + '/order/' + id + '/details');
  }

  getOrderBySellerUsername(username) {
    return this.http.get(this.url + '/order/seller/' + username);
  }

  getUnallocatedOrder() {
    return this.http.get(this.url + '/order/seller/');
  }

  assignsOrdersToSeller(sellerID, data) {
    return this.http.put(this.url + '/order/assign/' + sellerID, data);
  }
}


// /order/assign/{sellerID}
