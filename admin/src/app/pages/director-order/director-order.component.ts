import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-director-order',
  templateUrl: './director-order.component.html',
  styleUrls: ['./director-order.component.css']
})
export class DirectorOrderComponent implements OnInit {

  public orders;
  public users;
  private url;
  private checkedOrders = [];
  private orderids;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(next => {
      this.url = next[1].path;
    });

    this.getSellers();

    this.getOrders();
  }

  getSellers() {
    this.userService.getAllByRole('SELLER').subscribe(data => {
      this.users = data;
    });
  }

  getOrders() {
    if (this.url === 'assigned') {
      this.orderService.getAllOrders().subscribe(data => {
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
    console.log(this.orderids);
    this.orderService.assignsOrdersToSeller(3, this.orderids).subscribe(result => {
      this.router.navigate(['/order/assign']);
    });
  }

}
