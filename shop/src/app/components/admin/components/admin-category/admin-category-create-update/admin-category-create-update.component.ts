import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../../../services/product.service';
import {CategoryService} from '../../../../../services/category.service';

@Component({
  selector: 'app-admin-category-create-update',
  templateUrl: './admin-category-create-update.component.html',
  styleUrls: ['./admin-category-create-update.component.css']
})
export class AdminCategoryCreateUpdateComponent implements OnInit {

  public categories;
  public category: any = {
    id: '',
    name: '',
    parentCategory: {
      id: ''
    }
  };
  public id;
  public title;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
    });

    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (this.id !== 'create') {
      this.categoryService.get(this.id).subscribe(data => {
        this.category = data;
        console.log(data);
      });
    }

    if (this.router.url === '/admin/category/create') {
      this.title = 'Dodaj kategorie';
    } else {
      this.title = 'Edytuj kategorie: ' + this.id;
    }
  }

  save() {
    if (this.router.url === '/admin/product/create') {
      this.categoryService.create(this.category).subscribe(result => {
        this.router.navigate(['/admin/product']);
      });
    } else {
      this.categoryService.update(this.category.id, this.category).subscribe(result => {
        this.router.navigate(['/admin/product']);
      });
    }
  }

}
