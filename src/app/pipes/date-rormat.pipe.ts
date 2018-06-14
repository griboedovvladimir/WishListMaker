import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../services/localization.service';
import DateTimeFormat = Intl.DateTimeFormat;

@Pipe({
  name: 'dateFormat',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  dateFormatter: DateTimeFormat; /*native function of JavaScript*/

  constructor(private localizationService: LocalizationService) {
    localizationService.onChange(code => this.updateFormatter(code));
    this.updateFormatter(localizationService.currentLanguage);
  }

  updateFormatter(code: string) {
    this.dateFormatter = new Intl.DateTimeFormat(code); /*native function of JavaScript*/
  }

  transform(date: Date) {
    return this.dateFormatter.format(date);
  }

}
