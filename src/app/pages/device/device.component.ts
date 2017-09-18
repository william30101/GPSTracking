import {Component, OnInit, TemplateRef} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ModalHelperService} from '../../shared/services/modal-helper.service';
import {FirebaseApiService} from '../../shared/services/firebase-api.service';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {


  bsModalRef: BsModalRef;
  mappingRef: any;
  deviceLists: any = [];

  public users = [
    { name: '大寶', age: 21 },
    { name: '小明', age: 24 },
    { name: '老王', age: 18 },
    { name: '國王', age: 18 },
    { name: '皇后', age: 18 },
    { name: '新增設備', age: 18 }
  ];

  source: LocalDataSource;
  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
        width : '10%'
      },
      name: {
        title: 'Device Name'
      },
      timestamp: {
        title: 'TimeStamp'
      }
    }
  };

  constructor(private modalHelp: ModalHelperService,
              private firebaseApi: FirebaseApiService,
              private user: UserService) {
    // this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {
    const userProfile = this.user.getProfile();



    this.mappingRef = this.firebaseApi.getDeviceMappingRef(userProfile.uid);
    this.mappingRef.on('child_added', data => {
      console.log('key : ' + data.key + ' value: ' + data.val());
      this.deviceLists.push({
        key: data.key,
        data: data.val()
      });
    });


    this.deviceLists.push({data : {deviceName : '新增設備', nickName : '新增設備'}});

    // this.mappingRef.on('value', function(snapshot) {
    //    this.deviceLists = snapshot.val();
    //
    //   console.log('device : ' + snapshot.val());
    // }, function (errorObject) {
    //   console.log('The read failed: ' + errorObject.code);
    // });

    // console.log('devices : ' + this.deviceLists);

     // this.deviceLists.splice(1, 1);
    // this.mappingRef.set(this.deviceLists);
  }

  public onClickCheck(name: string) {
    console.log('name : ' + name);
    if (name === '新增設備') {
      this.modalHelp.showConfirm('Confirmation', 'How to pass data to modal?');
    }
  }

}
