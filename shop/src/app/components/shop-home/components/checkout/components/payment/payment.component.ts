import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() paymentMethod;
  @Output() paymentMethodChange = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.paymentMethod);
  }

  setPaymentMethod(value) {
    this.paymentMethodChange.emit({paymentMethod: value});
  }

  reviewPage() {
    this.router.navigate(['/checkout/review']);
  }

}
