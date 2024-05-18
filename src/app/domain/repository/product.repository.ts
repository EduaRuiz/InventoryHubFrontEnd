import {
  IProductAddQuantityModel,
  IProductRegisterModel,
  IProductSaleModel,
} from '@domain/models';
import { Observable } from 'rxjs';

export abstract class ProductRepository<T> {
  abstract getProductById(id: string): Observable<T>;
  abstract registerProduct(data: IProductRegisterModel): Observable<T>;
  abstract registerQuantity(
    id: string,
    data: IProductAddQuantityModel
  ): Observable<T>;
  abstract registerCustomerSale(
    data: IProductSaleModel
  ): Observable<IProductSaleModel>;
  abstract registerResellerSale(
    data: IProductSaleModel
  ): Observable<IProductSaleModel>;
  abstract getAllProduct(id: string): Observable<T[]>;
}
