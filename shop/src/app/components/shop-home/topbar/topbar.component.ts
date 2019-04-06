import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public searchQuery = '';

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.authService.currentUser);
    // console.log(this.authService.currentUser.scopes[0].authority);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);

  }

  search() {
    this.router.navigate(['/search'], {queryParams: {q: this.searchQuery}});
  }

}
