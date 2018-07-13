import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {APIService} from '../../../services/API.service';

@Component({
  selector: 'app-wish-list-list',
  templateUrl: './wish-list-list.component.html',
  styleUrls: ['./wish-list-list.component.scss']
})
export class WishListListComponent implements OnInit {
  addWishlistActive = false;
  @Output() removeWishLists = new EventEmitter();
  goBack() {
    this.removeWishLists.emit();
  }
  constructor(private api:APIService) {
    this.api.getWishLists().subscribe(res => {
      console.log(res);
    });
  }
  ngOnInit() {
  }
  openAddWishlist() {
    this.addWishlistActive = true;
  }
  closeAddWishlist() {
    this.addWishlistActive = false;
  }
}
