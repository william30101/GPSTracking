import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

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


  data = [
    {
      id: 1,
      name: '我的大鳥',
      timestamp: '20170822110000'
    },
    {
      id: 2,
      name: '小東西',
      timestamp: '20170823110000'
    },
    {
      id: 3,
      name: '沒什麼',
      timestamp: '20170825110000'
    }
  ];



  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {

  }



  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      // event.newData['name'] += ' + added in code';
      console.log('save ');
      console.log(event.newData['name']);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      // event.newData['name'] += ' + added in code';
      console.log('create ');
      console.log(event.newData['name']);
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }


}
