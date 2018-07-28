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
  @Output() changePage = new EventEmitter();
  changePageTo(pageName: string) {
    this.changePage.emit(pageName);
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
      sessionStorage.removeItem('WishListMakerStore');
      this.router.navigate(['/login']);
    }
  }
}
