import { LocationsService } from './../locations/locations.service';
import { Location } from './../data models/location';
import { Category } from './../data models/category';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class CategoriesService {

  readonly CATEGORIES = 'categories';
  readonly CATEGORIES_ID = 'categoriesId';

  idGenerate = 0;

  private _catergories: Category[] = [];

  private categoriesSub = new BehaviorSubject <Category[]>([]);

  categories = this.categoriesSub.asObservable();
  
  private deleteLoctionsSub = new Subject <number[]>();

  deleteLocations = this.deleteLoctionsSub.asObservable();

  constructor() {
    this.onRefresh();
  }

  onRefresh() {
    window.addEventListener('pagehide', event => {
      this.saveToStorage();
    }, false);
    this._catergories = JSON.parse(localStorage.getItem(this.CATEGORIES)) || [];
    this.idGenerate = JSON.parse(localStorage.getItem(this.CATEGORIES_ID)) || 0;
    this.categoriesSub.next(this._catergories);
  }
  
  saveToStorage(){
    localStorage.removeItem(this.CATEGORIES);
    localStorage.removeItem(this.CATEGORIES_ID);
    localStorage.setItem(this.CATEGORIES , JSON.stringify(this._catergories));
    localStorage.setItem(this.CATEGORIES_ID , JSON.stringify(this.idGenerate));
  }

  addCategory(name: string) {
    this._catergories.push(new Category(name, this.genId()));
    this.categoriesSub.next(this._catergories);
  }
  
  editCategory(id: number, name:string) {
    const category: Category = this._catergories.find(cat => cat.id === id);
    category.name = name;
    this.categoriesSub.next(this._catergories);
  }
  
  deleteCategory(id: number){
    const category = this._catergories.find(cat=> cat.id === id);
    if(category.locations && category.locations.length > 0){
      this.deleteLoctionsSub.next(category.locations);
    }
    this._catergories.splice(this._catergories.findIndex(cat=> cat.id === id), 1);
    this.categoriesSub.next(this._catergories);
  }
  
  removeLocationFromCategory(catId, location: Location){
    let category: Category = this._catergories.find(cat => cat.id === catId);
    category.locations.splice(category.locations.findIndex(loc => loc === location.id), 1)
    this.categoriesSub.next(this._catergories);
  }
  
  addLocationToCategory(catId, location: Location){
    let category: Category = this._catergories.find(cat => cat.id === catId);
    category.locations.push(location.id);
    this.categoriesSub.next(this._catergories);
  }
  
  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
  }
}
