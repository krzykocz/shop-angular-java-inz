import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {OrderService} from '../../../../../services/order.service';

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.css']
})
export class AdminOrderUpdateComponent implements OnInit {

  public id;
  public order;
  public orderItems;
  public userDetails;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private userService: UserService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(this.id).subscribe(result => {
      this.order = result;
    });
    this.orderService.getOrderDetailsByOrderId(this.id).subscribe(result => {
      this.orderItems = result;
      this.getUserDetails();
    });

  }

  getUserDetails() {
    if (this.order != null) {
      // this.userService.getUserDetailsById(this.order.user.id).subscribe(result => {
      //   this.userDetails = result;
      // });
    }
  }

}
