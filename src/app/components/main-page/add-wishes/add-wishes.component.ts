import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUploader, FileSelectDirective} from 'ng2-file-upload/ng2-file-upload';
import {APIService} from '../../../services/API.service';
import {Router} from '@angular/router';
import {LocalizationService} from '../../../services/localization.service';

const URL = 'http://localhost:8080/upload';


@Component({
  selector: 'app-add-wishes',
  templateUrl: './add-wishes.component.html',
  styleUrls: ['./add-wishes.component.scss']
})

export class AddWishesComponent implements OnInit {
  rtl: Array<string>;
  wish = {
    name: '',
    addPrice: 1,
    addLink: '',
    imgLink: '',
  };
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});
  @Output() closeAddForm = new EventEmitter();

  closeAdd() {
    this.closeAddForm.emit();
  }

  constructor(private api: APIService, private router: Router, private localizationService: LocalizationService) {
    if (localizationService.getCurrentLocalization().isRtl) {
      this.rtl = ['rtl'];
    } else {
      this.rtl = ['remove'];
    }
    localizationService.onChange(code => {
      if (localizationService.getCurrentLocalization().isRtl) {
        this.rtl = ['rtl'];
      } else {
        this.rtl = ['remove'];
      }
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
  }

  onSubmit(form, validation) {
    if (validation.valid) {
      let dataWhish = {
        userToken: `${localStorage.getItem('WishListMaker')
          ? localStorage.getItem('WishListMaker')
          : sessionStorage.getItem('WishListMaker')}`,
        name: form.addName.value,
        link: form.addLink.value,
        imagePath: form.addlinkImg.value || '/assets/img/appImg/defoultImg.png',
        price: parseInt(form.addPrice.value, 10),
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
}
