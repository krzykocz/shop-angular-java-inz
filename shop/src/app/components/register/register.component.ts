import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // credentials = {
  //   username: '',
  //   email: '',
  //   password: ''
  // };
  submitted = false;
  registerForm: FormGroup;
  passwordNotMatch = true;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      city: new FormControl(''),
      voivodeship: new FormControl(''),
      postalCode: new FormControl(''),
      street: new FormControl(''),
      houseNr: new FormControl(''),
      phone: new FormControl('')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  signup() {

    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.passwordNotMatch = false;
    }
    this.submitted = true;
    if (this.registerForm.invalid || this.passwordNotMatch) {
      return;
    }
    console.log(this.registerForm.value);
    this.authService.create(this.registerForm.value).subscribe(result => {
      return this.router.navigate(['/login']);
    });
  }

}
