import {Pipe, PipeTransform} from '@angular/core';
import {LocalizationService} from '../services/localization.service';


@Pipe({
  name: 'localize',
  pure: true,
})
export class LocalizePipe implements PipeTransform {
  map = this.localizationService.getLanguageMap();

  constructor(private localizationService: LocalizationService) {
    localizationService.onChange(code => {
      this.map = this.localizationService.getLanguageMap();
    });
  }
  transform(string: string): any {
    return  this.map.then(map => {
     let stringMap = map as Map<string, string>;
      return Promise.resolve(stringMap.get(string));
      });
  }
}
