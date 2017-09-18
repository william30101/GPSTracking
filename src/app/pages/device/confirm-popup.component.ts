import { Component, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import * as firebase from 'firebase';
import { FirebaseApiService } from '../../shared/services/firebase-api.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './modal-template.html',
  providers: [BsModalService]
})

export class ConfirmPopupComponent {
  @Input() title: string = 'Modal with component';
  @Input() message: string = 'Message here...';

  mappingRef: any;

  constructor(public bsModalRef: BsModalRef,
              private user: UserService,
              private firebaseApi: FirebaseApiService) { }

  public onSubmit(form: NgForm) {
      console.log('Click ok...');


      const deviceName = form.value['device_name'];
      const NickName = form.value['nick_name'];
      const userProfile = this.user.getProfile();

      this.mappingRef = this.firebaseApi.getDeviceMappingRef(userProfile.uid);
      this.mappingRef.push().set({
        nickName : NickName,
        deviceName: deviceName
      });

    }
}
