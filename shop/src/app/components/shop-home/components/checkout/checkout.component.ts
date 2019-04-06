import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private page;
  private paymentMethod;
  private deliveryMethod;

  constructor(private _ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(routeParams => {
      this.page = routeParams['page'];
    });
  }

  setPaymentMethod(p) {
    this.paymentMethod = p.paymentMethod;
  }

  setDeliveryMethod(p) {
    this.deliveryMethod = p.deliveryMethod;
  }

}
