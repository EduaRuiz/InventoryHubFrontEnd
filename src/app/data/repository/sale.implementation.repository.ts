import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IProductSaleModel, ISaleModel } from '@domain/models';
import { SaleRepository } from '@domain/repository/sales.repository';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class SaleImplementationRepository extends SaleRepository {
  apiUrl = `http://${environment.HOST_3000}/api/v1/product/`;
  apiUrlGetAll = `http://${environment.HOST_3001}/api/v1/sales/`;
  override createSale(
    Sale: ISaleModel,
    type: string
  ): Observable<IProductSaleModel> {
    return this.http.patch<IProductSaleModel>(`${this.apiUrl}${type}/`, Sale);
  }
  override getAllSale(id: string): Observable<IProductSaleModel[]> {
    return this.http
      .get<
        {
          id: string;
          number: number;
          total: number;
          date: Date;
          branchId: string;
          products: string[];
          type: string;
        }[]
      >(`${this.apiUrlGetAll}${id}`)
      .pipe(
        map((data) => {
          return data.map((sale) => {
            if (typeof sale.products[0] === 'string') {
              return {
                id: sale.id,
                number: sale.number,
                total: sale.total,
                date: sale.date,
                branchId: sale.branchId,
                type: sale.type,
                products: sale.products.map((product) => {
                  return JSON.parse(product) as {
                    name: string;
                    price: number;
                    quantity: number;
                  };
                }),
              };
            }
            return sale as unknown as IProductSaleModel;
          });
        })
      );
  }

  constructor(private http: HttpClient) {
    super();
  }
}
