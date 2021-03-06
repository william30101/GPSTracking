import { User } from './../models/user';
import { EventEmitter, Injectable } from '@angular/core';
// import * as firebase from 'firebase';

@Injectable()
export class UserService {

  statusChange = new EventEmitter<any>();
  profile: User;

  // constructor(private liveMessages: LiveMessageService) { }

  constructor() { }

  set(userFromDatabase) {
    this.profile = userFromDatabase;
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);

    // const messaging = firebase.messaging();

    // messaging.requestPermission()
    //   .then(() => {
    //
    //     firebase.messaging().getToken()
    //       .then(token => {
    //         console.log('Token received: ', token);
    //         const updates = {};
    //
    //         messaging.onMessage(payload => {
    //           console.log(payload);
    //           // this.liveMessages.display((payload as any).notification);
    //         });
    //
    //         updates['/users/' + userFromDatabase.uid + '/messageToken'] = token;
    //         return firebase.database().ref().update(updates);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

  }

  destroy() {
    localStorage.removeItem('user');
    this.statusChange.emit(null);
    console.log('user removed from localstorage');
  }

  getProfile() {
    const user = localStorage.getItem('user');
    this.profile = JSON.parse(user);
    return this.profile;
  }
}
