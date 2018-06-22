import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationService {
  authorizated = false;
  constructor() {
  }
  public getAuthorization() {
    return this.authorizated;
  }

}
