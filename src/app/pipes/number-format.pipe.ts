import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../services/localization.service';
import NumberFormat = Intl.NumberFormat;

@Pipe({
  name: 'numberFormat',
  pure: false
})
export class NumberFormatPipe implements PipeTransform {
  numberFormatter: NumberFormat; /*native function of JavaScript*/

  constructor(private localizationService: LocalizationService) {
    localizationService.onChange(code => this.updateFormatter(code));
    this.updateFormatter(localizationService.currentLanguage);
  }

  updateFormatter(code: string) {
    this. numberFormatter = new Intl.NumberFormat(code); /*native function of JavaScript*/
  }

  transform(number: number) {
    return this. numberFormatter.format(number);
  }

}
