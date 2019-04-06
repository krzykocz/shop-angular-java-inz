import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../../../../services/cart.service';
import {ProductService} from '../../../../../../services/product.service';
import {OrderService} from '../../../../../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() paymentMethod;
  @Input() deliveryMethod;
  public products = [];
  public total = 0;
  private cart;
  private paymentStatus;
  private items = [];

  constructor(private cartService: CartService, private productService: ProductService, private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    for (const item of this.cart) {
      this.productService.get(item.id).subscribe(data => {
        for (const it of this.cart) {
          if (data['id'] === it.id) {
            data['quantity'] = it.quantity;
            this.total += data['price'] * it.quantity;
          }
          console.log(data);
        }
        this.products.push(data);
      });
    }
  }

  setPaymentStatus() {
    if (this.paymentMethod === 'Odbiór osobisty') {
      this.paymentStatus = 'Płatność przy odbiorze';
    } else {
      this.paymentStatus = 'Oczekiwanie';
    }
  }

  placeorder() {
    this.setPaymentStatus();
    for (const cartItem of this.cart) {
      this.items.push({
        count: cartItem.quantity,
        product: {id: cartItem.id}
      });
    }
    const order = {
      paymentMethod: this.paymentMethod,
      paymentStatus: this.paymentStatus,
      deliveryMethod: this.deliveryMethod,
      items: this.items
    };
    this.orderService.create(order).subscribe(result => {
      this.cartService.clearCart();
      this.router.navigate(['/user/orders']);
    });
  }

}
