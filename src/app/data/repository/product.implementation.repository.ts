import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  IProductAddQuantityModel,
  IProductModel,
  IProductSaleModel,
} from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { ProductImplementationRepositoryMapper } from './mappers/product.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductImplementationRepository extends ProductRepository<IProductModel> {
  apiUrl = 'http://localhost:3000/api/v1/product/';
  apiUrlGet = 'http://localhost:3001/api/v1/product/';
  apiUrlGetAll = 'http://localhost:3001/api/v1/products/';

  override getAllProduct(id: string): Observable<IProductModel[]> {
    console.log('GetAllProductUseCase');
    console.log(this.apiUrlGetAll + id);
    return this.http.get<IProductModel[]>(this.apiUrlGetAll + id);
  }

  registerProduct(data: IProductModel): Observable<IProductModel> {
    return this.http.post<IProductModel>(`${this.apiUrl}register`, data);
  }
  registerQuantity(
    id: string,
    data: IProductAddQuantityModel
  ): Observable<IProductModel> {
    return this.http.post<IProductModel>(`${this.apiUrl}/purchase/${id}`, data);
  }
  registerCustomerSale(data: IProductSaleModel): Observable<IProductSaleModel> {
    return this.http.post<IProductSaleModel>(
      `${this.apiUrl}customer-sale/`,
      data
    );
  }
  registerResellerSale(data: IProductSaleModel): Observable<IProductSaleModel> {
    return this.http.post<IProductSaleModel>(
      `${this.apiUrl}seller-sale/`,
      data
    );
  }
  getProductById(id: string): Observable<IProductModel> {
    return this.http.get<IProductModel>(`${this.apiUrlGetAll}${id}`);
  }
  ProductMapper = new ProductImplementationRepositoryMapper();
  constructor(private http: HttpClient) {
    super();
  }
}
