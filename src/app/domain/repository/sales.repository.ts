import { Observable } from 'rxjs';
import { IProductSaleModel, ISaleModel } from '..';

export abstract class SaleRepository {
  abstract createSale(
    Sale: ISaleModel,
    type: string
  ): Observable<IProductSaleModel>;
  abstract getAllSale(id: string): Observable<IProductSaleModel[]>;
}
