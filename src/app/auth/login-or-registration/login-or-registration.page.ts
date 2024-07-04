import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-or-registration',
  templateUrl: './login-or-registration.page.html',
  styleUrls: ['./login-or-registration.page.scss'],
})
export class LoginOrRegistrationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toLogin(){
    this.router.navigateByUrl('login');
  }

  toRegister(){
    this.router.navigateByUrl('register');
  }
}
