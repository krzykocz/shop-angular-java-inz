import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders;
  public url;
  private user;
  private checkedOrders = [];
  private orderids;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(next => {
      this.url = next[1].path;
    });

    this.userService.getAuthenticatedUser().subscribe(result => {
      this.user = result;
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

  assign() {
    this.orderids = {
      ids: this.checkedOrders
    };

    this.orderService.assignsOrdersToSeller(this.user['id'], this.orderids).subscribe(result => {
      this.router.navigate(['/order/allocated']);
    });

    setTimeout(() => {
        this.router.navigate(['/order/allocated']);
      },
      500);


  }
}
