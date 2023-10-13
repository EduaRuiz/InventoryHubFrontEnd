import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GetAllProductsComponent,
  IndividualProductComponent,
} from './components';
import { ProductComponent } from './pages/product/product.component';
import { RegisterProductComponent } from '../product/components';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'all',
        component: GetAllProductsComponent,
      },
      {
        path: 'product/register',
        component: RegisterProductComponent,
      },
      {
        path: 'individual/:id',
        component: IndividualProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
