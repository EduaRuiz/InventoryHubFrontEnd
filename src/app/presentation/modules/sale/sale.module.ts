import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GetAllSalesComponent } from './components/get-all/get-all.component';
import { SaleRoutingModule } from './sale-routing.module';

@NgModule({
  declarations: [GetAllSalesComponent],
  imports: [CommonModule, SaleRoutingModule],
})
export class SaleModule {}
