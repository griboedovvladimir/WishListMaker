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
  constructor(private api: APIService) {
    this.init();
    this.api.inits = this.init.bind(this);
  }
  ngOnInit() {
  }
  init() {
    this.api.getWishes().subscribe(res => {
      this.items = res;
    });
  }
  Removing(id: string) {
this.items.forEach((i, item) => {
if (i._id === id) {
  this.items.splice(item, 1);
}
});
 this.init();
    // this.api.doInits();
  }
}
