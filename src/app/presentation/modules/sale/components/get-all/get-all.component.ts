import { Component, OnInit } from '@angular/core';
import { SaleSocket } from '@presentation/shared';
import { SaleUseCaseProviders } from 'data/factory';
import { SaleRepository } from '../../../../../domain/repository/sales.repository';

@Component({
  selector: 'app-get-all',
  templateUrl: './get-all.component.html',
  styleUrls: ['./get-all.component.css'],
})
export class GetAllSalesComponent implements OnInit {
  factorySale = SaleUseCaseProviders;
  sales = this.saleSocket.sales;
  branchId = '';
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly saleSocket: SaleSocket
  ) {}
  ngOnInit(): void {
    this.branchId = localStorage.getItem('branchId') || '';
    this.saleSocket.joinSale(this.branchId);
    this.factorySale.getAllSale
      .useFactory(this.saleRepository)
      .execute(this.branchId)
      .subscribe((data) => {
        this.saleSocket.setSales(data);
        this.saleSocket.orderbyNumber();
      });
  }
}
