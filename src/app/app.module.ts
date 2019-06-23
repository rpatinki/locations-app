import { CategoriesService } from 'src/app/categories/categories.service';
import { SharedModule } from './shared/shared.module';
import { CategoriesModule } from './categories/categories/categories.module';
import { LocationsModule } from './locations/locations/locations.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsService } from './locations/locations.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LocationsModule,
    ToolbarModule,
    ButtonModule,
    CategoriesModule,
    SharedModule
  ],
  providers: [
    LocationsService,
    CategoriesService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
