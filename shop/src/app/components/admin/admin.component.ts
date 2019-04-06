import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private page;

  constructor(private _ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(routeParams => {
      this.page = routeParams['page'];
    });
  }

}
