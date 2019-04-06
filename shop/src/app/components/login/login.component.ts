import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logged = null;
  logout = null;
  credentials = {
    username: '',
    password: ''
  };

  constructor(public authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  signIn() {
    console.log(this.credentials);
    return this.authService.authenticate(this.credentials).subscribe(result => {
      if (!result) {
        this.logged = false;
      } else {
        this.logout = false;
        this.credentials = {
          username: '',
          password: ''
        };
        this.router.navigate(['/']);
      }
    });
  }

}
