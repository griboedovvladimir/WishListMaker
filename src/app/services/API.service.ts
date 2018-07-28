import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {WishItemInterface} from '../interfaces/wish-item.interface';
import {UserInterface} from '../interfaces/user.interface';


@Injectable()
export class APIService {
  constructor(private http: HttpClient) {
  }

  inits: any;

  setInits(callback) {
    this.inits = callback;
  }

  doInits() {
    this.inits();
  }

  getUserEmail(): Observable<any> {
    return this.http.post('http://localhost:8080/getuseremail',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }

  getUser(): Observable<any> {
    return this.http.post('http://localhost:8080/getuser',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }

  updateUser(user): Observable<any> {
    return  this.http.post('http://localhost:8080/updateuser',
      {user});
  }
  removeUser(): Observable<any> {
    return this.http.post('http://localhost:8080/deleteuser',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`
      });
  }
  addWishList(wishList): Observable<any> {
    return  this.http.post('http://localhost:8080/addwishlists',
      {wishList});
  }

  updateWishList(wishList): Observable<any> {
    return  this.http.post('http://localhost:8080/updatewishlists',
      {wishList});
  }
  getFollowWishLists(email): Observable<any> {
    return this.http.post('http://localhost:8080/getfollowwishlists',
      {
        'email': email
      }).pipe(
      map(json => {
        return json;
      })
    );
  }
  getWishLists(): Observable<any> {
    return this.http.post('http://localhost:8080/getwishlists',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }
deleteWishList(id: string): Observable<any> {
  return this.http.post('http://localhost:8080/deletewishlist',
    {
      id: id
    });
}
  getWishList(id): Observable<any> {
    return this.http.post('http://localhost:8080/getwishlist',
      {
        'id': id
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
    return this.http.post('http://localhost:8080/deletewishes',
      {
        id: id
      });
  }

  getWishes(): Observable<any> {
    return this.http.post('http://localhost:8080/getwishes',
      {
        'token': `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMakerStore')}`
      }).pipe(
      map(json => {
        return json;
      })
    );
  }
}
