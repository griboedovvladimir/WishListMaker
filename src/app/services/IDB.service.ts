import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


const db = window.indexedDB;
const baseName = 'WishListMaker';

@Injectable()
export class IDBService {
  constructor(private http: HttpClient) {
  }

  static connectDB(db, baseName, storeName, version, keyPath = 'name') {
    return new Promise((res, rej) => {
      let request = db.open(baseName, version);
      request.onerror = (event) => rej(event.target.error);
      request.onsuccess = () => {
        res(request.result);
      };
      request.onupgradeneeded = function (e) {
        e.currentTarget.result.createObjectStore(storeName, {keyPath: keyPath});
        IDBService.connectDB(db, baseName, storeName, version);
      };
    });
  }

  static Add(db, storeName, data) {
    return new Promise((res, rej) => {
      let ObjectStore = db.transaction([storeName], 'readwrite').objectStore(storeName);
      res(ObjectStore.add(data));
    });
  }

  static Get(db, storeName, key) {
    return new Promise((res, rej) => {
      let req = db.transaction([storeName]).objectStore(storeName).get(key);
      req.onsuccess = () => {
        res(req.result);
      };
      req.onerror = () => {
        rej();
      };
    });
  }

  static GetAll(db, storeName) {
    return new Promise((res, rej) => {
      let req = db.transaction([storeName]).objectStore(storeName).getAll();
      req.onsuccess = () => {
        res(req.result);
      };
      req.onerror = () => {
        rej();
      };
    });
  }

  requestToDB(): Observable<any> {
    return this.http.post('http://localhost:8080/localization', {body: 'ok'})
      .pipe(
        map(string => {
          return string;
        })
      );
  }

  trensactionGetAll(storeName) {
    return new Promise((resolve, reject) => {
      IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
        IDBService.GetAll(dataBase, storeName);
      });
    });
  }

  transactionAdd(storeName, version, data) {
    IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
      IDBService.Add(dataBase, storeName, data);
    });
  }

  transactionGet(storeName, key) {
    return new Promise((resolve, reject) => {
      IDBService.connectDB(db, baseName, storeName, 1).then(dataBase => {
        IDBService.Get(dataBase, storeName, key).then(responase => resolve(responase));
      });
    });
  }

}
