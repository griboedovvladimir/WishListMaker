import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/API.service';

@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.scss']
})
export class WishListPageComponent implements OnInit {

  checkedRights = false;
  faultRights = false;
  userEmail: string;
  wishList: any;
  constructor(private api: APIService) {

    let preloader = new Image(200, 200);
    preloader.src = 'assets/img/appImg/preloader.svg';
    preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
    preloader.id = 'preloader';
    document.body.appendChild(preloader);
    let id = document.location.pathname.split('/')[2];
    this.api.getWishList(id).subscribe(res => {
      this.wishList = res;
      let arrMembers = res.members.split(',');
      this.api.getUserEmail().subscribe(email => {
        this.userEmail = email;
        if (arrMembers.includes(email) || res.userToken === (localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore'))) {
          this.checkedRights = true;
        } else {
          this.faultRights = true;
        }
        preloader.remove();
      });
    });
  }

  ngOnInit() {
  }

}
