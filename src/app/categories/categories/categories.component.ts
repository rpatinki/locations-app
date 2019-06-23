import { CategoriesService } from './../categories.service';
import { CategoryDetailsComponent } from './../category-details/category-details.component';
import { Category } from './../../data models/category';
import { Component, OnInit } from '@angular/core';
import { DialogService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class CategoriesComponent implements OnInit {

  selectdCategory: Category = null;
  catergories: Category[];

  constructor(public dialogService: DialogService,
              private cs: CategoriesService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cs.categories.subscribe(categories => this.catergories = categories);
  }

  show(header: string, edit: boolean, ) {
    const ref = this.dialogService.open(CategoryDetailsComponent, {
      header: header,
      width: '500px',
      data: {
        category : this.selectdCategory,
        edit: edit
      } 
    });

    ref.onClose.subscribe((form) => {
      if(form){
        if(this.selectdCategory){
          this.cs.editCategory(this.selectdCategory.id, form.name);
        } else {
          this.cs.addCategory(form.name);
        }
      }
    });
  }

  setSelectedCategory(category) {
    this.selectdCategory = category.value[0];
  }

  isSelected(): boolean {
    return this.selectdCategory ? true : false;
  }

  handleToolBarEvent(event: string){
    switch(event){
      case 'add':
        this.show('New Category', true);
        break;
      case 'edit':
        this.show(`Category ${this.selectdCategory.name} details`, true);
        break;
      case 'view':
        this.show(`Category ${this.selectdCategory.name} details`, false);
        break;
      case 'delete':
        this.confirmationService.confirm({
            message: "Are you sure you want to delete category and all it's loctions?",
            accept: () => {
              this.cs.deleteCategory(this.selectdCategory.id);
              this.selectdCategory = null;
            }
        });
        break;
    }
  }
}
