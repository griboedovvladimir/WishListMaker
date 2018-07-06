import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
user = {
  name: '',
  email: '',
  password: ''
};
registrationErr = '';
  constructor(private router: Router, private Authorize: AuthorizationService) { }
formSubmitted = false;
  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`You must enter ${thingName}`);
            break;
          case 'minlength':
            messages.push(`A ${thing} must be at least
            ${state.errors['minlength'].requiredLength} characters`);
            break;
          case 'pattern':
            messages.push(`The ${thing} contains illegal characters`);
            break;
        }
      }
    }
    return messages;
  }
  getFormValidationMessages(form: NgForm): Array<string> {
    let messages: string[] = [];
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k).forEach(m => messages.push(m));
    });
    return messages;
  }
  submitForm(form: NgForm) {
    this.Authorize.checkUser(this.user.email).then(res => {
      if (res) {
        this.registrationErr = 'This email is already exist';
      } else if (res === false && form.valid) {
        this.Authorize.registerUser(this.user).then(token => {
          localStorage.setItem('WishListMaker', token); this.router.navigate(['/']);
          form.reset();
          this.formSubmitted = false;
        });
      }
    });
    this.formSubmitted = true;
    let preloader = new Image(200, 200);
    preloader.src = 'assets/img/appImg/preloader.svg';
    preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
    preloader.id = 'preloader';
    document.body.appendChild(preloader);
  }
onClick() {
}
}
