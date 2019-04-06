import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-admin-user-create-update',
  templateUrl: './admin-user-create-update.component.html',
  styleUrls: ['./admin-user-create-update.component.css']
})
export class AdminUserCreateUpdateComponent implements OnInit {

  public user: any = {
    id: '',
    username: '',
    email: '',
    role: ''
  };
  public userDetails: any = {
    id: '',
    firstname: '',
    lastname: '',
    city: '',
    voivodeship: '',
    postalCode: '',
    street: '',
    houseNr: '',
    phone: '',
    user: {
      id: ''
    },
  };
  private id;

  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.userService.getUserById(this.id).subscribe(result => {
      this.user = result;
    });

    // this.userService.getUserDetailsById(this.id).subscribe(data => {
    //   this.userDetails = data;
    // });
  }

  saveUser() {
    console.log(this.user);
    this.userService.updateUserById(this.user.id, this.user).subscribe(result => {
      this.router.navigate(['/admin/user']);
    });
  }

  saveUserDetails() {
    // this.userService.updateUserDetailsByUserId(this.user.id, this.userDetails).subscribe(result => {
    //   this.router.navigate(['/admin/user']);
    // });
  }

}
