import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../../services/product.service';
import {CategoryService} from '../../../../../services/category.service';
import {ManufacturerService} from '../../../../../services/manufacturer.service';

@Component({
  selector: 'app-admin-product-create-update',
  templateUrl: './admin-product-create-update.component.html',
  styleUrls: ['./admin-product-create-update.component.css']
})
export class AdminProductCreateUpdateComponent implements OnInit {
  public title = '';
  public id;
  public product: any = {
    id: '',
    name: '',
    price: '',
    count: '',
    description: '',
    image: '',
    category: {
      id: ''
    },
    manufacturer: {
      id: ''
    }
  };

  private manufacturers;
  private categories;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private manufacturerService: ManufacturerService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
      console.log(result);
    });

    this.manufacturerService.getAll().subscribe(result => {
      this.manufacturers = result;
    });

    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (this.id !== 'create') {
      this.productService.get(this.id).subscribe(data => {
        this.product = data;
      });
    }

    if (this.router.url === '/admin/product/create') {
      this.title = 'Dodaj produkt';
    } else {
      this.title = 'Edytuj produkt: ' + this.id;
    }

  }

  save() {
    if (this.router.url === '/admin/product/create') {
      this.productService.create(this.product).subscribe(result => {
        this.router.navigate(['/admin/product']);
      });
    } else {
      this.productService.update(this.product.id, this.product).subscribe(result => {
        this.router.navigate(['/admin/product']);
      });
    }
  }
}


