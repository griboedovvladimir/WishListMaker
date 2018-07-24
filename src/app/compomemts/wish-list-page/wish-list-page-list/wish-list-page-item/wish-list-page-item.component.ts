import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {APIService} from '../../../../services/API.service';

@Component({
  selector: 'app-wish-list-page-item',
  templateUrl: './wish-list-page-item.component.html',
  styleUrls: ['./wish-list-page-item.component.scss']
})
export class WishListPageItemComponent implements OnInit {
  @Input() itemData;
  @Input() userEmail;
  @Input() wishList;
  @Output() reCalculate = new EventEmitter();
  formActive = 'unvisible';
  checkbox = false;
  changeButton = 'change';
  show: boolean;

  constructor(private api: APIService) {
  }

  ngOnInit() {
    if (this.itemData.members.includes(this.userEmail)) {
      this.checkbox = true;
    }
    this.show = !(this.wishList.userToken === (localStorage.getItem('WishListMaker')
      ? localStorage.getItem('WishListMaker')
      : sessionStorage.getItem('WishListMakerStore')));
  }

  change(changeButton) {
    this.changeButton = changeButton === 'change' ? 'save_changes' : 'change';
    this.formActive = 'unvisible' && changeButton === 'change' ? 'visible' : 'unvisible';

    if (changeButton === 'save_changes') {
      if (this.checkbox === true && !this.itemData.members.includes(this.userEmail)) {
        this.itemData.members.push(this.userEmail);
      }
      if (this.checkbox === false && this.itemData.members.includes(this.userEmail)) {
        this.itemData.members.splice(this.userEmail, 1);
      }
      this.wishList.wishes.forEach((i, index) => {
        if (this.itemData.id === i.id) {
          this.wishList.wishes[index] = this.itemData;
        }
      });
      this.api.updateWishList(this.wishList).subscribe();
    }
    this.reCalculate.emit();
  }
}
