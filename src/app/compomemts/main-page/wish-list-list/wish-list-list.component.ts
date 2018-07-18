import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {APIService} from '../../../services/API.service';
import {WishListItemInterface} from '../../../interfaces/wish-list-item.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wish-list-list',
  templateUrl: './wish-list-list.component.html',
  styleUrls: ['./wish-list-list.component.scss']
})
export class WishListListComponent implements OnInit {
  addWishlistActive = false;
  host = document.location.protocol + '//' + document.location.host + '/';
  @Output() removeWishLists = new EventEmitter();
  wishlists: WishListItemInterface;

  goBack() {
    this.removeWishLists.emit();
  }

  constructor(private api: APIService, private router: Router) {
    this.init();
  }

  init() {
    this.api.getWishLists().subscribe(res => {
      this.wishlists = res;
    });
  }

  ngOnInit() {
  }

  ReRenderWishList() {
    this.init();
  }

  openAddWishlist() {
    this.addWishlistActive = true;
  }

  closeAddWishlist() {
    this.addWishlistActive = false;
  }

  derectToWishlist(url) {
    this.router.navigate(['/wishlists/' + url]);
  }

  onRemoveWishlist(id, item) {
    this.api.deleteWishList(id).subscribe();
    item.remove();
    this.init();
  }
}
