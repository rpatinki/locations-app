import { Category } from './../data models/category';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoriesService {

  readonly CATEGORIES = 'categories';

  idGenerate = 0;

  private _catergories: Category[] = [];

  private categoriesSub = new BehaviorSubject <Category[]>([]);

  categories = this.categoriesSub.asObservable();

  constructor() {
    this.onRefresh();
  }

  onRefresh() {
    window.addEventListener('pagehide', event => {
      localStorage.setItem(this.CATEGORIES , JSON.stringify(this._catergories));
    }, false);
    this._catergories = JSON.parse(localStorage.getItem(this.CATEGORIES)) || [];
    this.categoriesSub.next(this._catergories);
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
    this._catergories.splice(this._catergories.findIndex(cat=> cat.id === id));
    this.categoriesSub.next(this._catergories);
  }

  private genId(): number {
    this.idGenerate++;
    return this.idGenerate;
  }
}
