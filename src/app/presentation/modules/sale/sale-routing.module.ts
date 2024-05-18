import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetAllSalesComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: GetAllSalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleRoutingModule {}
