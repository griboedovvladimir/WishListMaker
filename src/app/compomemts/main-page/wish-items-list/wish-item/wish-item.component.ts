import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WishItemInterface} from '../../../../interfaces/wish-item.interface';
import {APIService} from '../../../../services/API.service';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.scss']
})
export class WishItemComponent implements OnInit {
  @Input() itemData: WishItemInterface;
  @Output() Removing = new EventEmitter<string>();

  constructor(private api: APIService) {
  }

  ngOnInit() {
  }

  Remove(id) {
    this.Removing.emit(id);
    this.api.deleteWhishes(id).subscribe();
  }
}
