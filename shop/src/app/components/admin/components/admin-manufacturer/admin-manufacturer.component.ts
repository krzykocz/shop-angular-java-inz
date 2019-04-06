import {Component, OnInit} from '@angular/core';
import {ManufacturerService} from '../../../../services/manufacturer.service';

@Component({
  selector: 'app-admin-manufacturer',
  templateUrl: './admin-manufacturer.component.html',
  styleUrls: ['./admin-manufacturer.component.css']
})
export class AdminManufacturerComponent implements OnInit {
  public manufacturers;

  constructor(private manufacturerService: ManufacturerService) {
  }

  ngOnInit() {
    this.manufacturerService.getAll().subscribe(result => {
      this.manufacturers = result;
      console.log(result);
    });
  }

}
