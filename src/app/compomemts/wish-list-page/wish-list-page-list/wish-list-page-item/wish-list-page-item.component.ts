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
  changeButton = 'Change';

  constructor(private api: APIService) {
  }

  ngOnInit() {
    if (this.itemData.members.includes(this.userEmail)) {
      this.checkbox = true;
    }
  }

  change(changeButton, iWantToBuy, notes, price) {
    this.changeButton = changeButton === 'Change' ? 'Save Change' : 'Change';
    this.formActive = 'unvisible' && changeButton === 'Change' ? 'visible' : 'unvisible';

    if (changeButton === 'Save Change') {
      this.itemData.notes = notes.value;
      this.itemData.price = price.value;
      if (iWantToBuy.checked === true && !this.itemData.members.includes(this.userEmail)) {
        this.itemData.members.push(this.userEmail);
      }
      if (iWantToBuy.checked === false && this.itemData.members.includes(this.userEmail)) {
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
