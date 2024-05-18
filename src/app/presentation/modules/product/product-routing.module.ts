import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardEmployee } from '@presentation/shared/guards';
import { RegisterProductComponent } from '../product/components';
import {
  GetAllProductsComponent,
  IndividualProductComponent,
} from './components';
import { ExcelComponent } from './components/excel/excel.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    canActivate: [AuthGuardEmployee],
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
      {
        path: 'excel',
        component: ExcelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
