import {Component, OnInit} from '@angular/core';
import {WishItemInterface} from '../../../interfaces/wish-item.interface';
import {APIService} from '../../../services/API.service';

@Component({
  selector: 'app-wish-items-list',
  templateUrl: './wish-items-list.component.html',
  styleUrls: ['./wish-items-list.component.scss']
})

export class WishItemsListComponent implements OnInit {
  items: Array<WishItemInterface>;
  searchStr = '';
  constructor(private api: APIService) {
    this.init();
    this.api.inits = this.init.bind(this);
  }

  ngOnInit() {
  }

  init() {
    let preloader = new Image(200, 200);
    preloader.src = 'assets/img/appImg/preloader.svg';
    preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
    preloader.id = 'preloader';
    document.body.appendChild(preloader);
    this.api.getWishes().subscribe(res => {
      this.items = res;
      preloader.remove();
    }, error => {
      preloader.remove();
    });
  }

  Removing(id: string) {
    this.items.forEach((i, item) => {
      if (i._id === id) {
        this.items.splice(item, 1);
      }
    });
    this.init();
  }
}
