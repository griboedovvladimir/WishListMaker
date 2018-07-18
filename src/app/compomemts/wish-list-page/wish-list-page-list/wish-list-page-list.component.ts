import {Component, Input, OnInit} from '@angular/core';
import {APIService} from '../../../services/API.service';

@Component({
  selector: 'app-wish-list-page-list',
  templateUrl: './wish-list-page-list.component.html',
  styleUrls: ['./wish-list-page-list.component.scss']
})
export class WishListPageListComponent implements OnInit {
  @Input() wishList: any;
  @Input() userEmail: any;
  members: string;
  items: any;
  calc: any;

  constructor(private  api: APIService) {
  }

  ngOnInit() {
    this.items = this.wishList.wishes;
    this.members = this.wishList.members.split(',');
    this.calculate(this.wishList);
  }
reCalculate() {
    this.api.getWishList(this.wishList.url).subscribe(res => {
      this.calculate(res);
    });
}
  calculate(wishlist) {
    let total = 0;
    let membersSumMap = new Map<string, number>();
    let membersTotalMap = new Map<string, number>();
    let membersArr = wishlist.members.split(',');
    membersArr.forEach(i => {
      membersSumMap.set(i, 0);
    });
    wishlist.wishes.forEach(i => {
      if (i.price) {
        total = total + parseInt(i.price, 10);
        let costAverage = i.price / i.members.length;
        i.members.forEach(member => {
          membersSumMap.set(member, membersSumMap.get(member) + costAverage);
        });
      }
    });
    let average = total / membersArr.length;
    for (let[key, value] of membersSumMap) {
      membersTotalMap.set(key, average - value);
    }
    this.calc = {total: total, membersSumMap: [...membersSumMap], membersTotalMap: [...membersTotalMap]};
  }
}
