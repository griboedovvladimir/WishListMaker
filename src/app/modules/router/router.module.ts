import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '../../compomemts/main-page/main-page.component';
import {AuthorizationComponent} from '../../compomemts/authorization/authorization.component';
import {RegistrationComponent} from '../../compomemts/registration/registration.component';
import {AuthorizationResolver} from '../../resolvers/authorization.resolver';
import {AuthorizationGuard} from '../../guards/authorization.guard';
import {LoginGuard} from '../../guards/login.guard';
import {RegistrationGuard} from '../../guards/registration.guard';
import {WishListPageComponent} from '../../compomemts/wish-list-page/wish-list-page.component';
import {ErrorPageComponent} from '../../compomemts/error-page/error-page.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, canActivate: [AuthorizationGuard]
  },
  {
    path: 'login', component: AuthorizationComponent, canActivate: [LoginGuard]
  },
  {
    path: 'registration', component: RegistrationComponent, canActivate: [RegistrationGuard]
  },
  {
    path: 'wishlists/:id', component: WishListPageComponent, canActivate: [AuthorizationGuard]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
