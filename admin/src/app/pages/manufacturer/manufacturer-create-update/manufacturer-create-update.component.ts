import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManufacturerService} from '../../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-create-update',
  templateUrl: './manufacturer-create-update.component.html',
  styleUrls: ['./manufacturer-create-update.component.css']
})
export class ManufacturerCreateUpdateComponent implements OnInit {

  public id;
  public title = '';
  public manufacturer: any = {
    id: '',
    name: ''
  };

  constructor(private router: Router, private manufacturerService: ManufacturerService, private _Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (this.id !== 'create') {
      this.manufacturerService.get(this.id).subscribe(data => {
        this.manufacturer = data;
      });
    }

    if (this.id === 'create') {
      this.title = 'Dodaj producenta';
    } else {
      this.title = 'Edytuj producenta: ' + this.id;
    }
  }

  save() {
    if (this.id === 'create') {
      this.manufacturerService.create(this.manufacturer).subscribe(result => {
        this.router.navigate(['/manufacturer']);
      });
    } else {
      this.manufacturerService.update(this.manufacturer.id, this.manufacturer).subscribe(result => {
        this.router.navigate(['/manufacturer']);
      });
    }
  }

}
