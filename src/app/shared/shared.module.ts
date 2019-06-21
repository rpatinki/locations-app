import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import {TooltipModule} from 'primeng/tooltip';


@NgModule({
  declarations: [
    BottomNavBarComponent,
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    TooltipModule
  ],
  exports: [
    BottomNavBarComponent,
    ToolBarComponent
  ]
})
export class SharedModule { }
