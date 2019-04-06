import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public title = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    console.log(this.authService.currentUser);
    switch (this.authService.currentUser.scopes[0].authority) {
      case 'SELLER':
        this.title = 'Zamówienia';
    }
  }

}
