import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public nameSearch;
  public countSearch;
  public priceSearch;
  public products;
  public totalPages: any = 0;
  private page = 0;
  private url;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(result => {
      this.url = result[1];
      console.log(this.url);
    });
    this.getProducts();

  }

  getProducts() {
    if (this.url === undefined) {
      this.productService.getAll(this.page, 20).subscribe(result => {
        this.products = result['content'];
        this.totalPages = new Array(result['totalPages']);
        console.log(this.products);
      });
    } else {
      this.productService.getAllProductsWithCountLessThan(50).subscribe(result => {
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
