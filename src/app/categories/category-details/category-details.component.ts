import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  categoryForm: FormGroup;

  editMode;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
      this.categoryForm = this.fb.group({
          name: [{value: '', disabled: true }]
      });
  }

  ngOnInit() {
    
    this.editMode = this.config.data.edit;
    const name: AbstractControl = this.categoryForm.get('name');
    
    name.setValidators(Validators.required);

    if (this.config.data.edit) {
      name.enable();
    }

    name.setValue(this.config.data.name)
  }

  onSubmit(){
    this.ref.close(this.categoryForm.value);
  }

  cancel(){
    this.ref.close();
  }

}
