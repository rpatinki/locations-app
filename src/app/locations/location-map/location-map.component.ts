import { Location } from './../../data models/location';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

declare var google: any;

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {

  options: any;
  overlays: any[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    const location: Location = this.config.data.location;

    this.options = {
      center: { lat: location.latitude, lng: location.longtitue },
      zoom: 12
    };

    this.overlays = [
      new google.maps.Marker({ position: { lat: location.latitude, lng: location.longtitue }, title: location.name })
    ]
  }

}
