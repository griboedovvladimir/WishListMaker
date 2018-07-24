import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {APIService} from '../../../services/API.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-follow-wishlists',
  templateUrl: './follow-wishlists.component.html',
  styleUrls: ['./follow-wishlists.component.scss']
})
export class FollowWishlistsComponent implements OnInit {
  @Output() removeFollowLists = new EventEmitter();
  host = document.location.protocol + '//' + document.location.host + '/';
  wishlists: any;
  message = false;

  constructor(private api: APIService, private router: Router) {
    let preloader = new Image(200, 200);
    preloader.src = 'assets/img/appImg/preloader.svg';
    preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
    preloader.id = 'preloader';
    document.body.appendChild(preloader);
    this.api.getUserEmail().subscribe(email => {
      this.api.getFollowWishLists(email).subscribe(res => {
        this.wishlists = res;
        if (!res[0]) {
          this.message = true;
        }
        preloader.remove();
      });
    });
  }

  ngOnInit() {
  }
  derectToWishlist(url) {
    this.router.navigate(['/wishlists/' + url]);
  }
  goBack() {
    this.removeFollowLists.emit();
  }
}
