import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {WishItemInterface} from '../interfaces/wish-item.interface';
import {WishListItemInterface} from '../interfaces/wish-list-item.interface';


@Injectable()
export  class APIService {
  constructor(private http: HttpClient) {
  }
  inits: any;
  setInits(callback) {
    this.inits = callback;
  }
  doInits() {
    this.inits();
  }
  addWishList(wishList) {
    this.http.post('http://localhost:8080/addwishlists',
      {wishList}).subscribe();
  }
  getWishLists(): Observable<any> {
    return this.http.post('http://localhost:8080/getwishlists',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMaker')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }
  addWishes(wish: WishItemInterface) {
    this.http.post('http://localhost:8080/addwishes',
      {wish}).subscribe();
  }
  deleteWhishes(id: string) {
     this.http.post('http://localhost:8080/deletewishes',
      {
        id: id
      }).subscribe();
}
  getWishes(): Observable<any> {
    return this.http.post('http://localhost:8080/getwishes',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMaker')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }
}
