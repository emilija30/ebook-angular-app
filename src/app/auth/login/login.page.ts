import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ message: 'Please wait...' })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(form.value).subscribe(
          resData => {
            console.log("Prijava uspesna");
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl("/");
            this.errorMessage = ''; // Clear the error message on successful login
          },
          err => {
            console.log('ne valja');
            console.error(err); // log the error for debugging
            this.isLoading = false;
            loadingEl.dismiss();
            this.errorMessage = 'Login failed. Please try again.'; // Set the error message
          }
        );
      });
  }

  toRegister(){
    this.router.navigateByUrl('register')
  }
}
