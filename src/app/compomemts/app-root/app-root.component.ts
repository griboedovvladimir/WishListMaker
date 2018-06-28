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
    // for (let i of this.localization) {
    //   this.IDB.transactionAdd('localization', 1, i);
    // }
    // this.IDB.transactionGet('localization', 'ru-RU').then(res => console.log(res));
    //   this.IDB.requestToDB().subscribe(res => {
    //     for (let i of res) {
    //       this.IDB.transactionAdd('localization', 1, i);
    //     }
    //   });
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.style = {flexDirection: 'row-reverse'};
      } else {
        this.style = {flexDirection: 'row'};
      }
    });
  }
}
