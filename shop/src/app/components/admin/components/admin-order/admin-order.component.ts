import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  public orders;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

}
