import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Injectable()
export class AuthorizationResolver {
  constructor(
    private Authorization: AuthorizationService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
          ) {
    if (this.Authorization.getAuthorization()) {

    }
  }
}
