import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-create-update',
  templateUrl: './user-create-update.component.html',
  styleUrls: ['./user-create-update.component.css']
})
export class UserCreateUpdateComponent implements OnInit {

  public user: any = {
    id: '',
    username: '',
    email: '',
    role: '',
    firstname: '',
    lastname: '',
    city: '',
    voivodeship: '',
    postalCode: '',
    street: '',
    houseNr: '',
    phone: ''
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
      this.router.navigate(['/user']);
    });
  }

}
