import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRootComponent} from '../../compomemts/app-root/app-root.component';


const routes: Routes = [
  {
    path: 'user-list', component: AppRootComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
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
