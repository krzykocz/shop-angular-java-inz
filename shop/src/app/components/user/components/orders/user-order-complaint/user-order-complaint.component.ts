import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../../../services/order.service';

@Component({
  selector: 'app-user-order-complaint',
  templateUrl: './user-order-complaint.component.html',
  styleUrls: ['./user-order-complaint.component.css']
})
export class UserOrderComplaintComponent implements OnInit {

  public order: any;
  public id;
  public description;

  constructor(private router: Router, private orderService: OrderService, private _Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.orderService.getOrderById(this.id).subscribe(result => {
      this.order = result;
    });
  }

  update() {
    this.order['complaintDescription'] = this.description;
    return this.orderService.complaint(this.order).subscribe(result => {
      this.router.navigate(['/user/order/' + this.id]);
    });
  }

}
