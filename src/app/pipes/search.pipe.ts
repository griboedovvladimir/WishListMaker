import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(wishes, value) {
    if (wishes) {
      return wishes.filter(wish => {
        return wish.name.toLowerCase().includes(value.toLowerCase());
      });
    }
  }
}
