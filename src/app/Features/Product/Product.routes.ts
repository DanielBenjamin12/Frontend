import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'crear',
    component: ProductCreateComponent,
  },
  {
    path: 'editar/:id',
    component: ProductEditComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },

];
