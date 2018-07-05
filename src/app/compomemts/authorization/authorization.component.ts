import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {LocalizationService} from '../../services/localization.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'authorization-comp',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
authorize = {
  email: '',
  password: ''
};
remember = false;
  registrationErr = '';
  formSubmitted = false;
  constructor(private Authorization: AuthorizationService, localizationService: LocalizationService,  private router: Router) {
    localizationService.onChange(code => {
    });
    this.remember = false;
  }
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
  ngOnInit() {
  }

onSubmit(form: NgForm, remember, el) {
    if (form.valid) {
      this.Authorization.checkAuthorization(this.authorize.email, this.authorize.password).then(res => {
        if (res) {
          if (remember) {
           localStorage.setItem('WishListMaker', res);
          } else {
            sessionStorage.setItem('WishListMaker', res);
          }
          this.Authorization.authorizated = true;
          this.router.navigate(['/']);
        }
      });
      form.reset();
      this.formSubmitted = false;
      let preloader = new Image(200, 200);
      preloader.src = 'assets/img/appImg/preloader.svg';
      preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
      preloader.id = 'preloader';
      document.body.appendChild(preloader);
    }
}
}
