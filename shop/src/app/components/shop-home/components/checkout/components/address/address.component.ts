import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  private credentials: any = {
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

  deliveryPage() {
    return this.userService.updateAuthenticatedUser(this.credentials).subscribe(result => {
      this.router.navigate(['/checkout/delivery']);
    });
  }
}
