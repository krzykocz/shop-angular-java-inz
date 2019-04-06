import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public credentials: any = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    city: '',
    voivodeship: '',
    postalCode: '',
    street: '',
    houseNr: '',
    phone: ''
  };

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    this.userService.getAuthenticatedUser().subscribe(result => {
      if (result !== null) {
        this.credentials = result;
      }
    });
  }

  update() {
    return this.userService.updateAuthenticatedUser(this.credentials).subscribe(result => {
      this.router.navigate(['/user/details']);
    });
  }

}
