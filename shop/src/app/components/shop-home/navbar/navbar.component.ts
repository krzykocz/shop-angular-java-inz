import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories = null;
  constructor(public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(results => {
      this.categories = results;
    });
  }

}
