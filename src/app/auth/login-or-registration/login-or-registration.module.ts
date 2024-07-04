import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOrRegistrationPageRoutingModule } from './login-or-registration-routing.module';

import { LoginOrRegistrationPage } from './login-or-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOrRegistrationPageRoutingModule
  ],
  declarations: [LoginOrRegistrationPage]
})
export class LoginOrRegistrationPageModule {}
