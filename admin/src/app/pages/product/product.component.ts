import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public searchText;
  public products;
  private page = 0;
  public totalPages: any = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll(this.page, 20).subscribe(result => {
      this.products = result['content'];
      this.totalPages = new Array(result['totalPages']);
    });
  }


  setPage(i, event: any) {
    console.log(this.totalPages);
    event.preventDefault();
    this.page = i;
    this.getProducts();
  }

}
