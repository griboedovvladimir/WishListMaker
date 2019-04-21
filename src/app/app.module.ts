import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRouterModule} from './modules/router/router.module';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpClientModule} from '@angular/common/http';
import {LoginGuard} from './guards/login.guard';
import {RegistrationGuard} from './guards/registration.guard';
import {FileUploadModule} from 'ng2-file-upload';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
// services
import {LocalizationService} from './services/localization.service';
import {AuthorizationService} from './services/authorization.service';
import {IDBService} from './services/IDB.service';
import {APIService} from './services/API.service';
// pipes
import {DateFormatPipe} from './pipes/date-rormat.pipe';
import {NumberFormatPipe} from './pipes/number-format.pipe';
import {LocalizePipe} from './pipes/localize.pipe';
import {SearchPipe} from './pipes/search.pipe';
import {PasswordHiddenPipe} from './pipes/password-hidden.pipe';
// components
import {AppRootComponent} from './components/app-root/app-root.component';
import {LanguageSwitcherComponent} from './components/language-switcher/language-switcher.component';
import {AuthorizationComponent} from './components/authorization/authorization.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MainLeftMenuComponent} from './components/main-page/main-left-menu/main-left-menu.component';
import {WishItemsListComponent} from './components/main-page/wish-items-list/wish-items-list.component';
import {WishItemComponent} from './components/main-page/wish-items-list/wish-item/wish-item.component';
import {AddWishesComponent} from './components/main-page/add-wishes/add-wishes.component';
import {WishListListComponent} from './components/main-page/wish-list-list/wish-list-list.component';
import {AddWishlistComponent} from './components/main-page/wish-list-list/add-wishlist/add-wishlist.component';
import {WishListPageComponent} from './components/wish-list-page/wish-list-page.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {WishListPageListComponent} from './components/wish-list-page/wish-list-page-list/wish-list-page-list.component';
import {WishListPageItemComponent} from './components/wish-list-page/wish-list-page-list/wish-list-page-item/wish-list-page-item.component';
import {FollowWishlistsComponent} from './components/main-page/follow-wishlists/follow-wishlists.component';
import {SettingsComponent} from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppRootComponent,
    LanguageSwitcherComponent,
    AuthorizationComponent,
    MainPageComponent,
    RegistrationComponent,
    MainLeftMenuComponent,
    WishItemsListComponent,
    WishItemComponent,
    AddWishesComponent,
    WishListListComponent,
    AddWishlistComponent,
    WishListPageComponent,
    ErrorPageComponent,
    WishListPageListComponent,
    WishListPageItemComponent,
    FollowWishlistsComponent,
    SettingsComponent,
    DateFormatPipe,
    NumberFormatPipe,
    LocalizePipe,
    SearchPipe,
    PasswordHiddenPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: true}),
    FileUploadModule,
  ],
  providers: [
    LocalizationService,
    AuthorizationService,
    IDBService,
    APIService,
    AuthorizationGuard,
    LoginGuard,
    RegistrationGuard,
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule {
}
