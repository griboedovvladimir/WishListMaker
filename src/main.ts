import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {IDBService} from './app/services/IDB.service';




if (environment.production) {
  enableProdMode();
}

fetch('http://localhost:8080/localization', {
  method: 'POST',
  mode: 'cors'
}).then(response => {
  response.json().then(res => {
      for (let i of res) {
        const db = window.indexedDB;
        const baseName = 'WishListMaker';
        const storeName = 'localization';
        IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
          IDBService.Add(dataBase, storeName,  i);
        });
      }
    }
  ).then(() => platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err)));
});



