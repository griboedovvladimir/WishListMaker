import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizatioService {
  authorizated: boolean;
  constructor() {
    this.authorizated = true;
  }

}
