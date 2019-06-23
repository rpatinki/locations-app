import { CategoriesService } from 'src/app/categories/categories.service';
import { Location } from './../../data models/location';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { Category } from 'src/app/data models/category';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {
  
  locationForm: FormGroup;
  categoriesList: SelectItem[] = [];
  editMode;
  categories: Category[];
  

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private cs: CategoriesService) {}
  
  ngOnInit() {
    
    const location: Location = this.config.data.location;
    
    this.locationForm = new FormGroup({
      name: new FormControl(location? location.name : '', Validators.required),
      latitude: new FormControl(location? location.latitude : '', [Validators.required, this.latitudeValidate()]),
      longtitue: new FormControl(location? location.longtitue : '', [Validators.required, this.longtitueValidate()]),
      address: new FormControl(location? location.address : '', Validators.required),
      category: new FormControl('', Validators.required)
    });

    this.cs.categories.subscribe((categories: Category[]) => 
    {
      this.setCategoryList(categories);
      this.categories = categories;
    });


    let categoryValue = 0;
    if (location){
      categoryValue = this.categories.findIndex(cat => cat.id === location.category.id);
    } 
    this.locationForm.get('category').setValue(categoryValue);

    this.editMode = this.config.data.edit;
    this.editMode ? this.locationForm.enable() : this.locationForm.disable();
  }

  setCategoryList(categories: Category[]){
    categories.forEach((category, index) => {
      this.categoriesList.push({label: category.name, value: index});
    });
  }

  latitudeError(){ return this.locationForm.get('latitude').hasError('latitude')};
  longtitueError(){ return this.locationForm.get('longtitue').hasError('longtitue')};

  requiredError(){
    return this.locationForm.get('name').hasError('required')
    || this.locationForm.get('latitude').hasError('required')
    ||  this.locationForm.get('longtitue').hasError('required')
    || this.locationForm.get('address').hasError('required')
  }

  onSubmit(){
    let payload = this.locationForm.value;
    payload.category = this.categories[this.locationForm.value.category];
    this.ref.close(payload);
  }

  cancel(){
    this.ref.close();
  }

  latitudeValidate(): ValidatorFn {
    return (c: AbstractControl) => {
      if(!this.locationForm){
        return null;
      }
      const value = this.locationForm.get('latitude').value;
        return value > 90 || value < -90 ? {'latitude': 'latitude range is max 90 min -90'} : null;
    }
  }
  
  longtitueValidate(): ValidatorFn {
    return (c: AbstractControl) => {
      if(!this.locationForm){
        return null;
      }
        const value = this.locationForm.get('longtitue').value;
        return value > 180 || value < -180 ? {'longtitue': 'longtitue range is max 180 min -180'} : null;
      }
  }



}
