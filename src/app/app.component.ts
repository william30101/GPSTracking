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
      apiKey: 'AIzaSyCii4JCVPbozCJq3oSxDYGUlGKmqLhLFME',
      authDomain: 'gpstracking-7df75.firebaseapp.com',
      databaseURL: 'https://gpstracking-7df75.firebaseio.com',
      projectId: 'gpstracking-7df75',
      storageBucket: 'gpstracking-7df75.appspot.com',
      messagingSenderId: '335491343092'
    };
    firebase.initializeApp(config);

  }
}
