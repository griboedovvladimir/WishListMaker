import {Injectable} from '@angular/core';
import {LanguageDescription} from '../interfaces/localization-interfaces';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IDBService} from './IDB.service';


@Injectable()
export class LocalizationService {
  static LanguageMap = new Map <string, any>();
  changeCallbacks = new Set<(code: string) => void>();
  currentLanguage = 'ru-RU';
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

  constructor (private http: HttpClient, private IDB: IDBService) {
   this.strings.clear();
}
static setLanguageMap(base) {
    for (let local of base) {
      LocalizationService.LanguageMap.set( local.name, local);
    }
}
  getLanguageMap() {
     this.strings.clear();
     for (let [key, value] of Object.entries(LocalizationService.LanguageMap.get(this.currentLanguage))) {
       this.strings.set(key, value as string);
     }
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
