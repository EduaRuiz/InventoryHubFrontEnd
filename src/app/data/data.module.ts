import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BranchRepository,
  ProductRepository,
  SaleRepository,
  UserRepository,
} from '@domain/repository';
import {
  BranchUseCaseProviders,
  ProductUseCaseProviders,
  SaleUseCaseProviders,
  UserUseCaseProviders,
} from './factory';
import {
  BranchImplementationRepository,
  ProductImplementationRepository,
  SaleImplementationRepository,
  UserImplementationRepository,
} from './repository';

@NgModule({
  providers: [
    UserImplementationRepository,
    ...Object.values(UserUseCaseProviders),
    { provide: UserRepository, useClass: UserImplementationRepository },
    BranchImplementationRepository,
    ...Object.values(BranchUseCaseProviders),
    { provide: BranchRepository, useClass: BranchImplementationRepository },
    ProductImplementationRepository,
    ...Object.values(ProductUseCaseProviders),
    { provide: ProductRepository, useClass: ProductImplementationRepository },
    SaleImplementationRepository,
    ...Object.values(SaleUseCaseProviders),
    { provide: SaleRepository, useClass: SaleImplementationRepository },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class DataModule {}
