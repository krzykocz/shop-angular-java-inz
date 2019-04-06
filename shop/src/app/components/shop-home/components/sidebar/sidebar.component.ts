import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories = null;

  constructor(public categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(results => {
      this.categories = results;
    });
  }

}
