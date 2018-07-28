import {Component, OnInit, Output,EventEmitter } from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {APIService} from '../../services/API.service';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload/ng2-file-upload';
import {Router} from '@angular/router';

const URL = 'http://localhost:8080/upload';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() removeSettings = new EventEmitter();
  user = {
    _id: '',
    name: '',
    email: '',
    password: '',
    token: '',
    sex: '',
    avatar: '',
  };
  userModel = {
    name: '',
    email: '',
    password: '',
  };
  radioFemale = false;
  radioMale = false;
  showPass = false;
  showWarning = false;
  goRemove: boolean;
  showButton = 'assets/img/appImg/hide.svg';
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

  constructor(private api: APIService, private router: Router) {
    this.init();
  }

  init() {
    let preloader = new Image(200, 200);
    preloader.src = 'assets/img/appImg/preloader.svg';
    preloader.style.cssText = 'position: absolute; top: 50%; left: 50%; margin: -100px 0 0 -100px';
    preloader.id = 'preloader';
    document.body.appendChild(preloader);
    this.api.getUser().subscribe(user => {
      this.user = user;
      if (user.sex === 'female') {
        this.radioFemale = true;
      } else {
        this.radioMale = true;
      }
      preloader.remove();
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  showPassword() {
    this.showPass = !this.showPass;
    this.showButton = this.showPass ? 'assets/img/appImg/show.svg' : 'assets/img/appImg/hide.svg';
  }
  goBack() {
    this.removeSettings.emit();
  }

  removeAccount() {
this.showWarning = !this.showWarning;
if (this.goRemove) {
  if (localStorage.getItem('WishListMaker')) {
    localStorage.removeItem('WishListMaker');
    this.router.navigate(['/login']);
  } else {
    sessionStorage.removeItem('WishListMaker');
    sessionStorage.removeItem('WishListMakerStore');
    this.router.navigate(['/login']);
  }
  // this.api.removeUser().subscribe();
}
this.goRemove = true;
  }

  onSubmit(form, validation) {
    if (validation.valid && (form.changeName.value || form.changeEmail.value
      || form.changePass.value || form.file.value || (form.sex.value !== this.user.sex))) {
      let dataUser = {
        ...this.user
      };
      if (form.changeName.value) {
        dataUser.name = form.changeName.value;
      }
      if (form.changeEmail.value) {
        dataUser.email = form.changeEmail.value;
      }
      if (form.changePass.value) {
        dataUser.password = form.changePass.value;
      }
      if (form.sex.value !== this.user.sex) {
        dataUser.sex = form.sex.value;
        if (form.sex.value === 'female' && (dataUser.avatar === '/assets/img/appImg/man.svg') ) {
          dataUser.avatar = '/assets/img/appImg/woman.svg';
        }
        if (form.sex.value === 'male' && (dataUser.avatar === '/assets/img/appImg/woman.svg') ) {
          dataUser.avatar = '/assets/img/appImg/man.svg';
        }
      }
      if (form.file.value) {
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          dataUser.avatar = 'http://localhost:8080/' + JSON.parse(response).filename;
           this.api.updateUser(dataUser).subscribe();
          this.init();
        };
      } else {
         this.api.updateUser(dataUser).subscribe();
        this.init();
      }
    }
  }
}
