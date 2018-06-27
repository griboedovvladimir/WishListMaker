import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';
import {LocalizationService} from '../../services/localization.service';

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
  constructor(private Autorization: AuthorizationService, localizationService: LocalizationService) {
    localizationService.onChange(code => {
      this.trigger++;
    });
  }

  ngOnInit() {
  }
onClick() {
    if (this.Autorization.authorizated === false) {
      this.Autorization.authorizated = true;
    }
}
}
