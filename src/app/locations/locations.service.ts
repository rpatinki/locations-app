import { CategoriesService } from './../categories/categories.service';
import { Category } from './../data models/category';
import { Location } from './../data models/location';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocationsService {

  readonly LOCATIONS = 'locations';
  readonly LOCATIONS_ID = 'locationsId';

  idGenerate = 0;

  private _locations: Location[] = [];

  private locationsSub = new BehaviorSubject <Location[]>([]);

  locations = this.locationsSub.asObservable();

  constructor(private cs: CategoriesService) {
    this.onRefresh();
    this.cs.deleteLocations.subscribe( (locations: number[])  => locations.forEach(loc => this.deleteLocationOnly(loc)))
  }

  onRefresh() {
    this._locations = JSON.parse(localStorage.getItem(this.LOCATIONS)) || [];
    this.idGenerate = JSON.parse(localStorage.getItem(this.LOCATIONS_ID)) || 0;
    this.locationsSub.next(this._locations);
  }

  saveToStorage(){
    localStorage.setItem(this.LOCATIONS , JSON.stringify(this._locations));
    localStorage.setItem(this.LOCATIONS_ID , JSON.stringify(this.idGenerate));
  }

  addLocation(name, lat, long, address, cat: Category) {
    this._locations.push(new Location(name, lat, long, address, cat, this.genId()));
    const location: Location = this._locations[this._locations.length -1];
    this.cs.addLocationToCategory(cat.id, location);
    this.locationsSub.next(this._locations);
    this.saveToStorage();
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
    this.saveToStorage();
  }
  
  deleteLocation(location: Location){
    this.cs.removeLocationFromCategory(location.category.id, location);   
    this._locations.splice(this._locations.findIndex(loc => loc.id === location.id));
    this.locationsSub.next(this._locations);
    this.saveToStorage();
  }

  deleteLocationOnly(location: number){
    this._locations.splice(this._locations.findIndex(loc => loc.id === location));
    this.locationsSub.next(this._locations);
    this.saveToStorage();
  }
  
  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
    this.saveToStorage();
  }
}
