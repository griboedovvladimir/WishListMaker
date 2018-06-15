import {Injectable} from '@angular/core';
import {LanguageDescription} from '../interfaces/localization-interfaces';


@Injectable()
export class LocalizationService {
  changeCallbacks = new Set<(code: string) => void>();
  currentLanguage = 'ru-RU';
  private localization = new Map<string, any>([
    ['ru-RU', {
      'Welcome_to': 'Добро пожаловать в '
    }],
    ['en-US', {
      'Welcome_to': 'Welcome to '
    }],
    ['en-GB', {
      'Welcome_to': 'Welcome to '
    }],
    ['ar-EG', {
      'Welcome_to': '\u{645}\u{631}\u{62d}\u{628}\u{627}\u{20}\u{628}\u{643}\u{645} '
    }],
  ]);
  private languages = new Map<string, LanguageDescription>([
    ['ru-RU', {
      title: 'Русский',
      code: 'ru-RU',
      isRtl: false
    }],
    ['en-US', {
      title: 'English (US)',
      code: 'en-US',
      isRtl: false
    }],
    ['en-GB', {
      title: 'English (GB)',
      code: 'en-GB',
      isRtl: false
    }],
    ['ar-EG', {
      title: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
      code: 'ar-EG',
      isRtl: true
    }]
  ]);
  strings = new Map<any, any>();

  constructor () {
   this.strings.clear();
}
  getLanguageMap(): Map<string, string> {
    fetch(`./assets/localization/${this.currentLanguage}.json`)
      .then(response => response.json())
      .then(localization => {
        this.strings.clear();
        for (let [key, value] of Object.entries(localization)) {
          this.strings.set(key, value);
        }
      });
    // for (let [key, value] of Object.entries(this.localization.get(this.currentLanguage))) {
    //   this.strings.set(key, value);
    //       }
    return this.strings;
}
  getLanguageList(): Array<LanguageDescription> {
    return [...this.languages.values()];
  }

  setCurrentLocalization(code: string) {
    if (this.languages.has(code)) {
      this.currentLanguage = code;
      for (let callback of this.changeCallbacks.values()) {
        callback(code);
      }
    }
  }

  getCurrentLocalization(): LanguageDescription {
    return this.languages.get(this.currentLanguage);
  }

  onChange(callback: (code: string) => void) {
    this.changeCallbacks.add(callback);
  }

}
