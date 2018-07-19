import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationService {
  authorizated = false;

  constructor() {
  }

  public getAuthorization() {
    if (localStorage.getItem('WishListMaker') || sessionStorage.getItem('WishListMaker')) {
      this.authorizated = true;
    }
    return this.authorizated;
  }

  registerUser(user) {
    return fetch('http://localhost:8080/registration', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json());
  }

  checkUser(email: string) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-from-urlencoded');
    return fetch('http://localhost:8080/authorization/:' + email, {
      method: 'get',
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());
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
      body: JSON.stringify({password: pass, email: email})
    }).then(response => response.json()).then(res => {
      if (res) {
        this.authorizated = true;
        return Promise.resolve(res);
      }
    });
  }
}
