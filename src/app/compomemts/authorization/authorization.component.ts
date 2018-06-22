import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization.service';

@Component({
  selector: 'authorization-comp',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
value = true;
  constructor(private Autorization: AuthorizationService) { }

  ngOnInit() {
  }
onClick() {
    if (this.Autorization.authorizated === false) {
      this.Autorization.authorizated = true;
    }
}
}
