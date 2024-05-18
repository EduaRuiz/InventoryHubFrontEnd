import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  GetAllProductsComponent,
  RegisterProductComponent,
} from './components';
import { IndividualProductComponent } from './components/individual/individual.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ExcelComponent } from './components/excel/excel.component';

@NgModule({
  declarations: [
    ProductComponent,
    IndividualProductComponent,
    GetAllProductsComponent,
    RegisterProductComponent,
    ExcelComponent,
  ],
  imports: [
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
})
export class ProductModule {}
