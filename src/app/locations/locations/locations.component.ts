import { LocationMapComponent } from './../location-map/location-map.component';
import { LocationDetailsComponent } from './../location-details/location-details.component';
import { LocationsService } from './../locations.service';
import { Location } from './../../data models/location';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories/categories.service';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  providers: [DialogService]
})
export class LocationsComponent implements OnInit {


  selectdLocation: Location = null;
  locations: Location[];
  isCategories: boolean;

  constructor(
              public dialogService: DialogService, 
              private cs: CategoriesService,
              private ls: LocationsService) { }

  ngOnInit() {
    this.ls.locations.subscribe(locations => 
      this.locations = locations);
    this.cs.categories.subscribe(categories => categories.length > 0 ? this.isCategories = true: this.isCategories = false);
  }

  show(header: string, edit: boolean ) {
    const ref = this.dialogService.open(LocationDetailsComponent, {
      header: header,
      width: '500px',
      data: {
        location : this.selectdLocation,
        edit: edit
      } 
    });

    ref.onClose.subscribe((value) => {
      if(value){
        if(this.selectdLocation){
          this.ls.editLocation(this.selectdLocation.id, value.name, value.latitude, value.longtitue, value.address, value.category);
        } else {
          this.ls.addLocation(value.name, value.latitude, value.longtitue, value.address, value.category);
        }
      }
    });
  }

  showMap(location: Location){
    const ref = this.dialogService.open(LocationMapComponent, {
      header: location.name + ' map',
      width: '600px', 
      data: {
        location : location
      } 
    });
  }

  setSelectedLocation(location) {
    this.selectdLocation = location.value[0];
  }

  isSelected(): boolean {
    return this.selectdLocation ? true : false;
  }

  handleToolBarEvent(event: string){
    switch(event){
      case 'add':
        this.show('New Location', true);
        break;
      case 'edit':
        this.show(`Location ${this.selectdLocation.name} details`, true);
        break;
      case 'view':
        this.show(`Location ${this.selectdLocation.name} details`, false);
        break;
      case 'delete':
        this.ls.deleteLocation(this.selectdLocation);
        this.selectdLocation = null;
        break;
    }
  }
}
