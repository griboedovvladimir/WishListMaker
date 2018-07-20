import {Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {LocalizationService} from '../../../services/localization.service';
import {Router} from '@angular/router';
import {APIService} from '../../../services/API.service';

@Component({
  selector: 'app-main-left-menu',
  templateUrl: './main-left-menu.component.html',
  styleUrls: ['./main-left-menu.component.scss']
})
export class MainLeftMenuComponent implements OnInit {
  rtf = ['menuWrapper'];
  @Output() showAddForm = new EventEmitter();
  @Output() goShowWishLists = new EventEmitter();
  @Output() goShowFollow = new EventEmitter();
  showWishLists() {
    this.goShowWishLists.emit();
  }
  showAdd() {
    this.showAddForm.emit();
  }

  showFollow() {
    this.goShowFollow.emit();
  }
  constructor(private localizationService: LocalizationService, private router: Router) {
    if (localizationService.getCurrentLocalization().isRtl) {
      this.rtf = ['rtf'];
    } else {
      this.rtf = ['menuWrapper'];
    }
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.rtf = ['rtf'];
      } else {
       this.rtf = ['menuWrapper'];
      }
    });
  }
  ngOnInit() {
  }
  logOut() {
    if (localStorage.getItem('WishListMaker')) {
      localStorage.removeItem('WishListMaker');
      this.router.navigate(['/login']);
    } else {
      sessionStorage.removeItem('WishListMaker');
      this.router.navigate(['/login']);
    }
  }
}
