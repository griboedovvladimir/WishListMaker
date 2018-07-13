import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {WishItemInterface} from '../../../../interfaces/wish-item.interface';
import {APIService} from '../../../../services/API.service';
import {WishListItemInterface} from '../../../../interfaces/wish-list-item.interface';
import {guid} from '../../../../helpers/guid.helper';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent implements OnInit {
  wishes: Array<WishItemInterface>;
@Output() closeAddWishlist = new EventEmitter();
closeWindow() {
  this.closeAddWishlist.emit();
}
  constructor(private api: APIService) {
    this.api.getWishes().subscribe(res => {
      this.wishes = res;
    });
  }
  onSubmit(form) {
  let elArr = form.querySelectorAll('input');
  let wishesArr: Array<WishListItemInterface> = [];
  for (let i = 0; i < elArr.length; i++) {
    if (elArr[i].checked) {
    this.wishes.forEach((el) => {
            if (el._id === elArr[i].name) {
              wishesArr.push({
              name: el.name,
              link: el.link,
              imagePath: el.imagePath,
              price: el.price,
              description: el.description,
              members: [],
              notes: ''
              });
            }
          });
    }
  }
  let wishList = {
    userToken: `${localStorage.getItem('WishListMaker')
      ? localStorage.getItem('WishListMaker')
      : sessionStorage.getItem('WishListMaker')}`,
    name: form.wishListName.value,
    members: form.members.value,
    wishes: wishesArr,
    url: guid()
  };
    this.api.addWishList(wishList);
    this.closeWindow();
  }
  ngOnInit() {
  }

}
