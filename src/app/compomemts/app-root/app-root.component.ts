import {Component} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent {
  currentDate = new Date();
  style: any = {flexDirection: 'row'};
  title = 'WishListMaker';

  constructor(localizationService: LocalizationService) {
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.style = {flexDirection: 'row-reverse'};
      } else {
        this.style = {flexDirection: 'row'};
      }
    });
  }
}
