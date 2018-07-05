import {Component, OnInit} from '@angular/core';
import {WishItemInterface} from '../../../interfaces/wish-item-interface';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-wish-items-list',
  templateUrl: './wish-items-list.component.html',
  styleUrls: ['./wish-items-list.component.scss']
})
export class WishItemsListComponent implements OnInit {
  items: Array<WishItemInterface>;
  constructor(private http: HttpClient) {
    this.getWishes().subscribe(res => {
      this.items = res;
    });
  }

  ngOnInit() {
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
