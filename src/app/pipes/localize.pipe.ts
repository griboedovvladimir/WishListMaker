import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../services/localization.service';


@Pipe({
  name: 'localize',
  pure: false,
})
export class LocalizePipe implements PipeTransform {
  map = this.localizationService.getLanguageMap();

  constructor(private localizationService: LocalizationService) {
    localizationService.onChange(code => {
      this.map = this.localizationService.getLanguageMap();
    });
  }

  transform(string) {
    let stringMap = this.map as Map<string, string>;
    return stringMap.get(string);
  }
}
