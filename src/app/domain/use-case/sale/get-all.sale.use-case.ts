import { IProductSaleModel } from '@domain/models';
import { SaleRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class GetAllSaleUseCase {
  constructor(private SaleRepository: SaleRepository) {}

  execute(id: string): Observable<IProductSaleModel[]> {
    return this.SaleRepository.getAllSale(id);
  }
}
