import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../services/order.service';
import {UserService} from '../services/user.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public orderStatistic;
  private unallocatedOrders;
  private newUsers;
  private productLessCount;
  private currentUser;

  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private orderService: OrderService, private userService: UserService, private productService: ProductService) {
  }

  ngOnInit() {

    this.orderService.getOrderStatistics().subscribe(result => {
      this.orderStatistic = result;
    });

    this.userService.getAuthenticatedUser().subscribe(result => {
      this.currentUser = result;
      if (this.currentUser.role === 'ADMIN') {
        this.router.navigate(['/user']);
      }
      if (this.currentUser.role === 'SELLER') {
        this.router.navigate(['/order/allocated']);
      }
    });

    this.orderService.getOrderBySellerUsername('null').subscribe(data => {
      this.unallocatedOrders = data['totalElements'];
    });

    this.userService.getAll().subscribe(data => {
      this.newUsers = data;
      this.newUsers = this.newUsers.length;
    });

    this.productService.getAllProductsWithCountLessThan(50).subscribe(result => {
      this.productLessCount = result['totalElements'];
      console.log(result);
    });
  }

}
