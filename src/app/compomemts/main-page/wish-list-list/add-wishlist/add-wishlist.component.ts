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
  @Output() ReRenderWishList = new EventEmitter();
  wishlistModel = {
    wishListName: '',
    members: ''
  };
  userEmail: string;

  closeWindow() {
    this.closeAddWishlist.emit();
  }

  constructor(private api: APIService) {
    this.api.getWishes().subscribe(res => {
      this.wishes = res;
    });
    this.api.getUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  onSubmit(form, validation) {
    if (validation.validate) {
      let elArr = form.querySelectorAll('input');
      let wishesArr: Array<WishListItemInterface> = [];
      for (let i = 0; i < elArr.length; i++) {
        if (elArr[i].checked) {
          this.wishes.forEach((el) => {
            if (el._id === elArr[i].name) {
              wishesArr.push({
                id: el._id,
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
        maker: this.userEmail,
        userToken: `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`,
        name: form.wishListName.value,
        members: form.members.value,
        wishes: wishesArr,
        url: guid()
      };
      this.api.addWishList(wishList).subscribe();
      this.closeWindow();
      this.ReRenderWishList.emit();
    }
  }

  ngOnInit() {
  }

}
