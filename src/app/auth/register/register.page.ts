import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm!: FormGroup;
  constructor(private authService: AuthService,private router: Router) {

  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(7)])
    });
  }

  onRegister(){
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe(resData=> {
      console.log("Registracija uspela");
      console.log(resData);
      this.router.navigateByUrl("/login");
    })
  }

}
