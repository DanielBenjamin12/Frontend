import { Routes } from '@angular/router';
import { ErrorPageComponent } from './Features/error-page/error-page.component';
import { HomeComponent } from './Features/home/home.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: HomeComponent,

  },
  {
    path: '**',
    component: ErrorPageComponent,
  },

];
