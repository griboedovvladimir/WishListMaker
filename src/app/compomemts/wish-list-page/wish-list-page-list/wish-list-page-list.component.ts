import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wish-list-page-list',
  templateUrl: './wish-list-page-list.component.html',
  styleUrls: ['./wish-list-page-list.component.scss']
})
export class WishListPageListComponent implements OnInit {
@Input() items: any;
@Input() userEmail: any;

  constructor() {

  }

  ngOnInit() {
  }
}
