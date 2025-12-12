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
    path: 'clientes',
    loadChildren: () =>
      import('./Features/Client/Cliente.routes').then(
        (m) => m.CLIENT_ROUTES
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./Features/Product/Product.routes').then(
        (m) => m.PRODUCT_ROUTES
      ),
  },
  {
    path: 'facturas',
    loadChildren: () =>
      import('./Features/Invoice/Invoice.routes').then(
        (m) => m.INVOICE_ROUTES
      ),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },

];
