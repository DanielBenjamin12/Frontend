import { Routes } from '@angular/router';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';

export const INVOICE_ROUTES: Routes = [

  {
    path: '',
    component: InvoiceListComponent,
    pathMatch: 'full',
  },
  {
    path: 'nuevo',
    component: InvoiceCreateComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: InvoiceDetailComponent,
    pathMatch: 'full',
  },
];
