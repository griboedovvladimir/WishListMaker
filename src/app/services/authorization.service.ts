import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationService {
  authorizated = false;
  constructor() {
  }
  public getAuthorization() {
    return this.authorizated;
  }
checkAuthorization(email: string, pass: string) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-from-urlencoded');
 return fetch('http://localhost:8080/authorization', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: pass, email : email})
}).then(response => response.json()).then(res => {
  if (res) {
    this.authorizated = true;
    return Promise.resolve(res);
  }
 });
}
}
