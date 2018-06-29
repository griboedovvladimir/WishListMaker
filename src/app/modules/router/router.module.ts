import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '../../compomemts/main-page/main-page.component';
import {AuthorizationComponent} from '../../compomemts/authorization/authorization.component';
import {RegistrationComponent} from '../../compomemts/registration/registration.component';
import {AuthorizationResolver} from '../../resolvers/authorization.resolver';
import {AuthorizationGuard} from '../../guards/authorization.guard';
import {LoginGuard} from '../../guards/login.guard';
import {RegistrationGuard} from '../../guards/registration.guard';


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
