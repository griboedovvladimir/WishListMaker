import {Component} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';
import {IDBService} from '../../services/IDB.service';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent {
  currentDate = new Date();
  style: any = {flexDirection: 'row'};
  title = 'WishListMaker';
  localization = [
    {name: 'en-GB',
      'Welcome_to' : 'Welcome to '
    },
    {name: 'en-US',
      'Welcome_to' : 'Welcome to '
    },
    {name: 'ru-RU',
      'Welcome_to' : 'Добро пожаловать в '
    },
    {name: 'ar-EG',
      'Welcome_to': 'مرحبا بكم '
    }
  ];

  constructor(localizationService: LocalizationService, private IDB: IDBService) {
    document.body.style.cssText = '' +
      'background-image: ' +
      'linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);' +
      '!important;background-size: cover;height:100%;';
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.style = {flexDirection: 'row-reverse'};
      } else {
        this.style = {flexDirection: 'row'};
      }
    });
  }
}
