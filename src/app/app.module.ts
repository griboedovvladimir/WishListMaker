import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRouterModule} from './modules/router/router.module';
import * as components from './components';
import * as services from './services';
import * as pipes from './pipes';
import {AuthorizationResolver} from './resolvers/authorization.resolver';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpClientModule} from '@angular/common/http';
import {LoginGuard} from './guards/login.guard';
import {RegistrationGuard} from './guards/registration.guard';
import { WishItemComponent } from './compomemts/main-page/wish-items-list/wish-item/wish-item.component';





@NgModule({
  declarations: [
    ...Object.values(components),
   ...Object.values(pipes),
   WishItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    HttpClientModule
  ],
  providers: [
   Object.values(services),
    AuthorizationResolver,
    AuthorizationGuard,
    LoginGuard,
    RegistrationGuard
  ],
  bootstrap: [components.AppRootComponent]
})
export class AppModule { }
