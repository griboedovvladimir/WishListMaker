import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {LocalizationService} from '../../services/localization.service';
import {Router} from '@angular/router';

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
  trigger = 2;
  constructor(private Authorization: AuthorizationService, localizationService: LocalizationService,  private router: Router) {
    localizationService.onChange(code => {
      this.trigger++;
    });
  }

  ngOnInit() {
  }
onClick() {
    if (this.Authorization.authorizated === false) {
      this.Authorization.checkAuthorization(this.authorize.email, this.authorize.password).then(res => {
        if (res) {
          console.log(res);
          this.Authorization.authorizated = true;
        }
      });
    }
}
}
