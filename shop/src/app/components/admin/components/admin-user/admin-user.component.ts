import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  public users: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAll().subscribe(result => {
      this.users = result;
    });
  }

}
