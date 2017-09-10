import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})



export class MapComponent implements OnInit {

  lat: number = 23.049887;
  lng: number = 120.575095;
  radi: number = 1000;
  zoom: number = 10;
  colo: String = 'DarkRed';
  icon: string = 'assets/eagle1.ico';
  batteryIcon: string = 'assets/Battery-32.png';

  markers: marker[];


  constructor() { }

  ngOnInit() {
  }

  onCurrentLocationBtn() {
    console.log('onCurrentLocationBtn be clicked');
    this.lat = 25.049887;
    this.lng = 121.575095;

    this.zoom = 15;
    this.radi = 30;

  }

  onHistoryBtn() {
    console.log('onHistoryBtn be clicked');

    this.markers = [
    {
      lat: 25.048013,
        lng: 121.577084,
      label: 'A',
      draggable: true
    },
    {
      lat: 25.046545,
        lng: 121.573865,
      label: 'B',
      draggable: false
    },
    {
      lat: 25.046117,
        lng: 121.570174,
      label: 'C',
      draggable: true
    },
    {
      lat: 25.046117,
        lng: 121.560174,
      label: 'D',
      draggable: true
    },
    {
      lat: 25.046117,
        lng: 121.550174,
      label: 'E',
      draggable: true
    },
    {
      lat: 25.046117,
        lng: 121.540174,
      label: 'F',
      draggable: true
    }
    ];

  }

}



interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
