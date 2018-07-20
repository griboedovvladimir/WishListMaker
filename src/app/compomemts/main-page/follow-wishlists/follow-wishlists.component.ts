import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-follow-wishlists',
  templateUrl: './follow-wishlists.component.html',
  styleUrls: ['./follow-wishlists.component.scss']
})
export class FollowWishlistsComponent implements OnInit {
  @Output() removeFollowLists = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
goBack() {
    this.removeFollowLists.emit();
}
}
