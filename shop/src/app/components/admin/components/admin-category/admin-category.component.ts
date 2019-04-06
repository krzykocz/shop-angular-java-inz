import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../../services/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  public categories;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
      console.log(result);
    });
  }

}
