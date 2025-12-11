import { Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsCreateComponent } from './clients-create/clients-create.component';


export const CLIENT_ROUTES: Routes = [

  {
    path: '',
    component: ClientsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo',
    component: ClientsCreateComponent,
  },
  {
    path: ':id',
    component: ClientDetailComponent,
  },

];
