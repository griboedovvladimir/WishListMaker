import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {IDBService} from './app/services/IDB.service';
import {LocalizationService} from './app/services/localization.service';


if (environment.production) {
  enableProdMode();
}

function preparation (...argsPromises): any {
  return Promise.all(argsPromises);
}
const db = window.indexedDB;
const baseName = 'WishListMaker';
const storeName = 'localization';
let el = document.createElement('div');
el.textContent = 'There is no Internet connection, all changes will not be saved';
el.style.cssText = 'max-width: 200px; width:20%; font-family:sans-serif; ' +
                    'font-size:12px; opacity:0.5; border: 2px solid black; border-radius:3px;' +
                    ' padding: 2px; position: absolute; top:2px; right:10px;';
document.body.style.cssText = '' +
  'background-image: ' +
  'linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%);' +
  '!important;background-size: cover;height:100%;';
let preloader = new Image(200, 200);
preloader.src = 'assets/img/appImg/preloader.svg';
preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
document.body.appendChild(preloader);


fetch('http://localhost:8080/localization', {
  method: 'POST',
  mode: 'cors'
}).then(response => {
    response.json().then(res => {
        for (let i of res) {
          IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
            IDBService.Add(dataBase, storeName,  i);
          });
        }
      }
    ).then(() => {
      IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
        return IDBService.GetAll(dataBase, storeName);
      }).then(base => LocalizationService.setLanguageMap(base))
        .then(() => platformBrowserDynamic().bootstrapModule(AppModule).then(( ) => {preloader.remove(); })
          .catch(err => console.log(err)));
    });
  }).catch(() => {
  IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
      IDBService.Get(dataBase, storeName,  'en-US').then(res => {
        if (res) {
          document.body.appendChild(el);
          IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
            return IDBService.GetAll(dataBase, storeName);
          }).then(base => LocalizationService.setLanguageMap(base))
            .then(() => platformBrowserDynamic().bootstrapModule(AppModule).then(( ) => {preloader.remove(); })
              .catch(err => console.log(err)));
        } else {
          document.body.innerText = 'Application can\'t start, maybe there are problems with network connection';
        }
        });
  });
});



