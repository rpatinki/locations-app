import { CategoriesComponent } from './categories/categories/categories.component';
import { LocationsComponent } from './locations/locations/locations.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  { path: '',
    redirectTo: '/locations',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
