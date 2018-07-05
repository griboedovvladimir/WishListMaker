import { Component, OnInit, Input, Output } from '@angular/core';
import {WishItemInterface} from '../../../../interfaces/wish-item-interface';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.scss']
})
export class WishItemComponent implements OnInit {
@Input() itemData: WishItemInterface;
  constructor() {
  }

  ngOnInit() {
  }
Remove(item) {
    item.remove();
}
}
