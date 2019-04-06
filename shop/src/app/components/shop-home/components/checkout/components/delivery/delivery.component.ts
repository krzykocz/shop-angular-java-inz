import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @Input() deliveryMethod;
  @Output() deliveryMethodChange = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.deliveryMethod);
  }

  setDeliveryMethod(value) {
    this.deliveryMethodChange.emit({deliveryMethod: value});
  }

  paymentPage() {
    this.router.navigate(['/checkout/payment']);
  }

}
