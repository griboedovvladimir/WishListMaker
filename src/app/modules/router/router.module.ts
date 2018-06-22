import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from '../../compomemts/main-page/main-page.component';
import {AuthorizationComponent} from '../../compomemts/authorization/authorization.component';
import {RegistrationComponent} from '../../compomemts/registration/registration.component';
import {AuthorizationResolver} from '../../resolvers/authorization.resolver';
import {AuthorizationGuard} from '../../guards/authorization.guard';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, canActivate: [AuthorizationGuard]
  },
  {
    path: 'login', component: AuthorizationComponent
  },
  {
    path: 'register', component: RegistrationComponent
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
