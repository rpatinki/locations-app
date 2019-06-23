import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {OrderListModule} from 'primeng/orderlist';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryDetailsComponent } from '../category-details/category-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderListModule,
    DynamicDialogModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  entryComponents: [
    CategoryDetailsComponent
  ]
})
export class CategoriesModule { }
