import {Injectable} from '@angular/core';
import {reflectTypeEntityToDeclaration} from '@angular/compiler-cli/src/ngtsc/metadata';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = [];

  constructor() {
  }

  add(id, quantity) {
    this.cart = this.getCart();
    console.log(this.getCart());
    const exist = this.cart.findIndex(item => {
      if (item.id === id) {
        return item;
      }
    });
    if (exist !== -1) {
      this.cart[exist].quantity = quantity;
    } else {
      this.cart.push({
        id: id,
        quantity: quantity
      });
    }
    return this.setCart();
  }

  del(id) {
    this.cart = this.getCart();
    const exist = this.cart.findIndex(item => item.id = id);
    if (exist) {
      this.cart.pop();
    }
    return this.setCart();
  }

  getCart() {
    const tempCart = JSON.parse(localStorage.getItem('cart'));
    return tempCart ? this.cart = tempCart : this.cart;
  }

  setCart() {
    return localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    return this.setCart();
  }
}


