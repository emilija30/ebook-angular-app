import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOrRegistrationPage } from './login-or-registration.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOrRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOrRegistrationPageRoutingModule {}
