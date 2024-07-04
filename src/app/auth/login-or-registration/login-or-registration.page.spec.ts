import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOrRegistrationPage } from './login-or-registration.page';

describe('LoginOrRegistrationPage', () => {
  let component: LoginOrRegistrationPage;
  let fixture: ComponentFixture<LoginOrRegistrationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginOrRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
