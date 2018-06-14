import { Component } from '@angular/core';
import {LocalizationService} from "../../services/localization.service";
@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent {
  currentDate = new Date();
  style:any = {flexDirection: 'row'};
  title = 'WishListMaker';
  dir = 'ltr';
  constructor(localizationService:LocalizationService){
    localizationService.onChange(code => {
      if(localizationService.getCurrentLocalization().isRtl){
        this.style = {flexDirection: 'row-reverse'};
        this.dir='rtl'
      }else{
        this.style = {flexDirection: 'row'};
        this.dir = 'ltr';
      }
    });
  }
}
