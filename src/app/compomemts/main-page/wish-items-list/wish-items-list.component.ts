import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-wish-items-list',
  templateUrl: './wish-items-list.component.html',
  styleUrls: ['./wish-items-list.component.scss']
})
export class WishItemsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
