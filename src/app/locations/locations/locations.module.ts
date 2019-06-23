import { LocationDetailsComponent } from './../location-details/location-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderListModule } from 'primeng/orderlist';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import {GMapModule} from 'primeng/gmap';
import { LocationMapComponent } from '../location-map/location-map.component';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationDetailsComponent,
    LocationMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderListModule,
    DynamicDialogModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    GMapModule
  ],
  entryComponents: [
    LocationDetailsComponent,
    LocationMapComponent
  ]
})
export class LocationsModule { }
