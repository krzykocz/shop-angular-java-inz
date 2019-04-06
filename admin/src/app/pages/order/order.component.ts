import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders;
  private url;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(next => {
      this.url = next[1].path;
    });

    this.getOrders();
  }

  getOrders() {
    if (this.url === 'allocated') {
      this.orderService.getOrderBySellerUsername(this.authService.currentUser.sub).subscribe(data => {
        this.orders = data['content'];
        console.log(data);
      });
    } else {
      this.orderService.getOrderBySellerUsername('null').subscribe(data => {
        this.orders = data['content'];
        console.log(data);
      });
    }
  }
}
