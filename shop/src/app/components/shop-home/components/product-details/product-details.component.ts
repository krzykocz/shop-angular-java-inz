import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {element} from 'protractor';
import {CartService} from '../../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private product: any;
  private id = null;
  private quantity: number;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    this.productService.get(this.id).subscribe(data => {
      this.product = data;
      console.log(data);
    });
    this.quantity = 1;
  }

  plus() {
    if (this.quantity < this.product.count) {
      ++this.quantity;
    } else {
      this.quantity = this.product.count;
    }
  }

  minus() {
    if (this.quantity > 1) {
      --this.quantity;
    } else {
      this.quantity = 1;
    }
  }

  addToCart() {
    if (this.quantity > this.product.count) {
      this.cartService.add(this.product.id, this.product.count);
    } else {
      this.cartService.add(this.product.id, this.quantity);
    }
    this.router.navigate(['/cart']);
  }

}
