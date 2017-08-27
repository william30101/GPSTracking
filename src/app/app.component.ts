import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const config = {
      apiKey: '********',
      authDomain: '********',
      databaseURL: '********',
      projectId: '********',
      storageBucket: '********',
      messagingSenderId: '********'
    };
    firebase.initializeApp(config);

  }
}
