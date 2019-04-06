import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../services/order.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private unallocatedOrders;
  private newUsers;

  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private orderService: OrderService, private userService: UserService) {
  }

  ngOnInit() {

    this.orderService.getOrderBySellerUsername('null').subscribe(data => {
      this.unallocatedOrders = data['totalElements'];
    });

    this.userService.getAll().subscribe(data => {
      this.newUsers = data;
      this.newUsers = this.newUsers.length;
    });
  }

}
