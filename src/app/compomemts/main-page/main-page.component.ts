import { Component, OnInit } from '@angular/core';
import {LocalizationService} from '../../services/localization.service';
import { LocalizePipe } from '../../pipes/localize.pipe';


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent  {
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

