import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';
import {LocalizePipe} from '../../pipes/localize.pipe';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentDate = new Date();
  style: any = {flexDirection: 'row'};
  title = 'WishListMaker';
  menuActive = false;
  addActive = false;
  wishesActive = true;
  url = '/assets/img/appImg/hamburger.svg';
  follow = false;

  constructor(localizationService: LocalizationService) {
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.style = {flexDirection: 'row-reverse'};
      } else {
        this.style = {flexDirection: 'row'};
      }
    });
  }

  ngOnInit() {
    if (document.getElementById('preloader')) {
      document.getElementById('preloader').remove();
    }
    if (sessionStorage.getItem('WishListMaker')) {
      sessionStorage.removeItem('WishListMaker');
    }
  }

  burgerClick() {
    if (this.menuActive !== true) {
      this.menuActive = true;
      this.url = '/assets/img/appImg/cross.svg';
    } else {
      this.url = '/assets/img/appImg/hamburger.svg';
      this.menuActive = false;
    }
  }

  showFollow() {
    this.follow = true;
    this.wishesActive = false;
    this.burgerClick();
  }

  removeFollowLists() {
    this.wishesActive = true;
    this.follow = false;
  }

  showAddForm() {
    this.addActive = true;
    this.burgerClick();
  }

  closeAddForm() {
    this.addActive = false;
  }

  removeWishLists() {
    this.wishesActive = true;
  }

  goShowWishLists() {
    this.wishesActive = false;
    this.burgerClick();
    this.follow = false;
  }
}

