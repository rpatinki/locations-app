import { CategoriesService } from './../categories/categories.service';
import { Category } from './../data models/category';
import { Location } from './../data models/location';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocationsService {

  readonly LOCATIONS = 'AppLocations';

  idGenerate = 0;

  private _locations: Location[] = [];

  private locationsSub = new BehaviorSubject <Location[]>([]);

  locations = this.locationsSub.asObservable();

  constructor(private cs: CategoriesService) {
    this.onRefresh();
    this.cs.deleteLocations.subscribe( (locations: Location[])  => locations.forEach(loc => this.deleteLocation(loc)))
  }

  onRefresh() {
    // window.addEventListener('pagehide', event => {
    //   localStorage.setItem(this.LOCATIONS , JSON.stringify(this._locations));
    // }, false);
    // this._locations = JSON.parse(localStorage.getItem(this.LOCATIONS)) || [];
    // this.locationsSub.next(this._locations);
  }

  addLocation(name, lat, long, address, cat: Category) {
    this._locations.push(new Location(name, lat, long, address, cat, this.genId()));
    const location: Location = this._locations[this._locations.length -1];
    this.cs.addLocationToCategory(cat.id, location);
    this.locationsSub.next(this._locations);
  }
  
  editLocation(id, name, lat, long, address, cat: Category) {
    const location: Location = this._locations.find(loc => loc.id === id);
    location.name = name;
    location.latitude = lat;
    location.longtitue = long;
    location.address = address;

    if (location.category !== cat){
      this.cs.removeLocationFromCategory(location.category.id, location);   
      this.cs.addLocationToCategory(cat.id, location);   
    }
    
    location.category = cat;
    this.locationsSub.next(this._locations);
  }
  
  deleteLocation(location: Location){
    this.cs.removeLocationFromCategory(location.category.id, location);   
    this._locations.splice(this._locations.findIndex(loc => loc.id === location.id));
    this.locationsSub.next(this._locations);
  }

  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
  }
}
