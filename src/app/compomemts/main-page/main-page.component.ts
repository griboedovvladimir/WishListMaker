import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  style: any = {flexDirection: 'row'};
  activePage = 'wish_page';
  menuActive = false;
  addActive = false;
  url = '/assets/img/appImg/hamburger.svg';

  constructor() {
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

  changePage(pageName) {
    if (pageName === 'add_wish_page') {
      this.addActive = true;
      this.activePage = 'wish_page';
    } else {
      this.activePage = pageName;
    }
    this.burgerClick();
  }

  removeFollowLists() {
    this.activePage = 'wish_page';
  }


  closeAddForm() {
    this.addActive = false;
  }

  removeWishLists() {
    this.activePage = 'wish_page';
  }

}

