import {Component} from '@angular/core';
import {LanguageDescription} from '../../interfaces/localization.interface';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  languageList: Array<LanguageDescription>;

  constructor(private localizationService: LocalizationService) {
    this.languageList = localizationService.getLanguageList();
  }
  get currentLanguage() {
    return this.localizationService.currentLanguage;
  }

  set currentLanguage(code) {
    this.localizationService.setCurrentLocalization(code);
  }

}
