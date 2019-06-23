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

  category: Category;
  editMode;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
  }

  ngOnInit() {
    
    this.category = this.config.data.category;
    
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category? this.category.name : '', Validators.required),
    });

    this.editMode = this.config.data.edit;
    this.editMode? this.categoryForm.enable() : this.categoryForm.disable();
  }

  onSubmit(){
    this.ref.close(this.categoryForm.value);
  }

  cancel(){
    this.ref.close();
  }

}
