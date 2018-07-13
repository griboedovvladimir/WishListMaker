import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import {APIService} from '../../../services/API.service';
import {Router} from '@angular/router';
const URL = 'http://localhost:8080/upload';


@Component({
  selector: 'app-add-wishes',
  templateUrl: './add-wishes.component.html',
  styleUrls: ['./add-wishes.component.scss']
})

export class AddWishesComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});
  @Output() closeAddForm = new EventEmitter();
  closeAdd() {
    this.closeAddForm.emit();
  }
  constructor( private api: APIService, private router: Router) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }
  onSubmit(form) {
    let dataWhish = {
      userToken: `${localStorage.getItem('WishListMaker')
        ? localStorage.getItem('WishListMaker')
        : sessionStorage.getItem('WishListMaker')}`,
      name: form.addName.value,
      link: form.addLink.value,
      imagePath: '/assets/img/appImg/defoultImg.png',
      price: form.addPrice.value,
      description: form.addDescript.value,
      _id: ''
    };
    if (form.file.value) {
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        dataWhish.imagePath = 'http://localhost:8080/' + JSON.parse(response).filename;
        this.api.addWishes(dataWhish);
      };
    } else {
      this.api.addWishes(dataWhish);
    }
    this.api.doInits();
    this.closeAdd();
  }
}
