import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WishItemInterface} from '../../../../interfaces/wish-item-interface';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.scss']
})
export class WishItemComponent implements OnInit {
@Input() itemData: WishItemInterface;
@Output() Removing = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }
Remove(id) {
this.Removing.emit(id);
}
}
