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
let doFetch: any;
IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
      IDBService.Get(dataBase, storeName,  'en-US').then(res => {
        if (!res) {
          let fetchTask = fetch('http://localhost:8080/localization', {
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
            );
            const makeLocalizationTask =  IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
              return IDBService.GetAll(dataBase, storeName); } ).then(base => LocalizationService.setLanguageMap(base));
            preparation(fetchTask, makeLocalizationTask).then(() => platformBrowserDynamic().bootstrapModule(AppModule)
              .catch(err => console.log(err)));
          });

        } else {
          const makeLocalizationTask =  IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
            return IDBService.GetAll(dataBase, storeName); } ).then(base => LocalizationService.setLanguageMap(base));
          makeLocalizationTask.then(() => platformBrowserDynamic().bootstrapModule(AppModule)
            .catch(err => console.log(err)));
        }
      }); }
);

// let fetchTask = fetch('http://localhost:8080/localization', {
//   method: 'POST',
//   mode: 'cors'
// }).then(response => {
//   response.json().then(res => {
//       for (let i of res) {
//         IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
//           IDBService.Add(dataBase, storeName,  i);
//         });
//       }
//     }
//   );
//   const makeLocalizationTask =  IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
//     return IDBService.GetAll(dataBase, storeName); } ).then();
//   preparation(fetchTask, makeLocalizationTask).then(() => platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.log(err)));
// });



