import { Injectable } from '@angular/core';
import { IProductSaleModel } from '@domain/models';
import { ProxyEnumEvents } from '@shared/utils';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SaleSocket {
  _sales: BehaviorSubject<IProductSaleModel[]> = new BehaviorSubject<
    IProductSaleModel[]
  >([]);
  sales = this._sales.asObservable();

  constructor(private socket: Socket) {
    this.socket.fromEvent(ProxyEnumEvents.SaleCreate).subscribe((data: any) => {
      this.addSale(data);
      this.orderbyNumber();
    });
  }

  joinSale(id: string) {
    this.socket.emit(ProxyEnumEvents.JoinSale, id);
  }

  leaveInventory(id: string) {
    this.socket.emit(ProxyEnumEvents.LeaveSale, id);
  }
  getSale() {
    return this.socket.fromEvent(ProxyEnumEvents.SaleCreate);
  }

  initSales(sales: IProductSaleModel[]) {
    this._sales.next(sales);
  }

  setSales(sales: IProductSaleModel[]) {
    this._sales.next(sales);
  }

  addSale(sale: IProductSaleModel) {
    this._sales.next([...this._sales.value, sale]);
  }

  updateSaleById(sale: IProductSaleModel) {
    const products = this._sales.value;
    const index = products.findIndex((p) => p.id === sale.id);
    products[index] = sale;
    this._sales.next(products);
  }

  orderbyNumber() {
    const products = this._sales.value;
    products.sort((a, b) => {
      if (a.number > b.number) {
        return 1;
      }
      return -1;
    });
    this._sales.next(products);
  }
}
