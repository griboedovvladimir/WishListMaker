import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'passwordHidden'
})
export class PasswordHiddenPipe implements PipeTransform {
  transform(password) {
    return new Array(password.length).fill('*').join('');
  }
}
