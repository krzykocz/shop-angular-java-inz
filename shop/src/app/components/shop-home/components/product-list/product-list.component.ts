import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private page = 0;
  private id = null;
  private q = null;
  private products = null;
  private totalPages: any = 0;

  constructor(private _Activatedroute: ActivatedRoute, private productService: ProductService) {
  }


  ngOnInit() {
    this._Activatedroute.params.subscribe(routeParams => {
      this.id = routeParams['id'];
      this.getProducts();
    });
    this._Activatedroute.queryParams.subscribe(queryParams => {
      this.q = queryParams['q'];
      this.getProducts();
    });
    this.getProducts();
  }


  getProducts() {
    if (this.id !== null && this.id !== undefined) {
      this.productService.getAllProductsByCategoryId(this.id).subscribe(result => {
        console.log('ID');
        this.products = result['content'];
      });
    } else if (this.q !== null && this.q !== undefined) {
      this.productService.search(this.q).subscribe(result => {
        console.log(result);
        this.products = result['content'];
      });
    } else {
      this.productService.getAll(this.page, 20).subscribe(result => {
        this.products = result['content'];
        this.totalPages = new Array(result['totalPages']);
      });
    }
  }

  setPage(i, event: any) {
    console.log(this.totalPages);
    event.preventDefault();
    this.page = i;
    this.getProducts();
  }

}
