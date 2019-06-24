import { LocationsService } from './../../locations/locations.service';
import { Category } from './../../data models/category';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms'
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categoryForm: FormGroup;

  loctionNames: string[] = [];

  category: Category;
  editMode;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private ls: LocationsService) {
  }

  ngOnInit() {
    
    this.category = this.config.data.category;
    
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category? this.category.name : '', Validators.required),
    });

    this.editMode = this.config.data.edit;
    this.editMode? this.categoryForm.enable() : this.categoryForm.disable();

    this.loctionNames = this.ls.getLoctionNames(this.category.locations);
  }

  onSubmit(){
    this.ref.close(this.categoryForm.value);
  }

  cancel(){
    this.ref.close();
  }

}
