import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {WishItemInterface} from '../../../../interfaces/wish-item.interface';
import {APIService} from '../../../../services/API.service';
import {LocalizationService} from '../../../../services/localization.service';

@Component({
  selector: 'app-wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.scss']
})
export class WishItemComponent implements OnInit {
  @Input() itemData: WishItemInterface;
  @Output() Removing = new EventEmitter<string>();
  rtf: Array<string>;

  constructor(private api: APIService, private localizationService:LocalizationService) {
    if (localizationService.getCurrentLocalization().isRtl) {
      this.rtf = ['rtl'];
    } else {
      this.rtf = ['remove'];
    }
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.rtf = ['rtl'];
      } else {
        this.rtf = ['remove'];
      }
    });
  }

  ngOnInit() {
  }

  Remove(id) {
    this.Removing.emit(id);
    this.api.deleteWhishes(id).subscribe();
  }
}
