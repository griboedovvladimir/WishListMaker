import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(private router: Router, private Authorization:  AuthorizationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!(localStorage.getItem('WishListMaker') || sessionStorage.getItem('WishListMaker'))) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
