import {Component, OnInit} from '@angular/core';
import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

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
