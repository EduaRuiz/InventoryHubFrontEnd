import { IProductSaleModel, ISaleModel } from '@domain/models';
import { SaleRepository } from '@domain/repository/sales.repository';
import { Observable } from 'rxjs';
export class CreateSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  execute(sale: ISaleModel, type: string): Observable<IProductSaleModel> {
    return this.saleRepository.createSale(sale, type);
  }
}
