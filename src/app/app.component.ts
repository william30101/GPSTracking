import { TranslateService } from '@ngx-translate/core';
import { firebaseConfig } from './app.conf';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('zhtw');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use('en');
  }

  ngOnInit() {
    firebase.initializeApp(firebaseConfig);
  }
}
