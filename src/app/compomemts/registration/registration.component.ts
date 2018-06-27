import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

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
  constructor(private router: Router) { }
formSubmitted = false;
  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      console.log(this.user);
      form.reset();
      this.formSubmitted = false;
      this.router.navigate(['/']);
    }
  }
onClick() {
}
}
