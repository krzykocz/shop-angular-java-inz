import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private page;

  constructor(private _ActivatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.page = this._ActivatedRoute.snapshot.paramMap.get('page');
    this._ActivatedRoute.params.subscribe(routeParams => {
      this.page = routeParams['page'];
    });
  }

}
