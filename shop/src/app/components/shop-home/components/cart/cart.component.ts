import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart.service';
import {ProductService} from '../../../../services/product.service';
import {Router} from '@angular/router';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private products = [];
  private cart;
  private total = 0;
  private items = [];

  constructor(private cartService: CartService, private productService: ProductService, private router: Router, private orderService: OrderService) {
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
    console.log(this.cart);
  }

  clearCart() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  order() {
    this.router.navigate(['/checkout/address']);
  }

  del(id) {
    this.cartService.del(id);
    this.router.navigate(['/cart']);
  }


  // order() {
  //   for (const cartItem of this.cart) {
  //     this.items.push({
  //       count: cartItem.quantity,
  //       product: {id: cartItem.id}
  //     });
  //   }
  //   const order = {
  //     paymentMethod: 'Gotówka',
  //     paymentStatus: 'Oczekiwanie na płatność',
  //     items: this.items
  //   };
  //   console.log(this.items);
  //   this.orderService.create(order).subscribe(result => {
  //     this.cartService.clearCart();
  //     this.router.navigate(['/user/orders']);
  //   });
  // }
}
