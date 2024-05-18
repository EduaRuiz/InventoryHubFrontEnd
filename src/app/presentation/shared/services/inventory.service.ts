import { Injectable } from '@angular/core';
import { IProductModel } from '@domain/models';
import { ProxyEnumEvents } from '@shared/utils/enum';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventorySocket {
  _products: BehaviorSubject<IProductModel[]> = new BehaviorSubject<
    IProductModel[]
  >([]);
  products = this._products.asObservable();

  constructor(private socket: Socket) {
    this.socket
      .fromEvent(ProxyEnumEvents.ProductCreate)
      .subscribe((data: any) => {
        this.addProduct(data);
        this.orderbyName();
      });
    this.socket
      .fromEvent(ProxyEnumEvents.ProductChange)
      .subscribe((data: any) => {
        this.updateProductById(data);
        this.orderbyName();
      });
  }

  joinInventory(id: string) {
    this.socket.emit(ProxyEnumEvents.JoinInventory, id);
  }

  leaveInventory(id: string) {
    this.socket.emit(ProxyEnumEvents.LeaveInventory, id);
  }
  getProduct() {
    return this.socket.fromEvent(ProxyEnumEvents.ProductChange);
  }

  initProducts(products: IProductModel[]) {
    this._products.next(products);
  }

  setProducts(products: IProductModel[]) {
    this._products.next(products);
  }

  addProduct(product: IProductModel) {
    this._products.next([...this._products.value, product]);
  }

  updateProductById(product: IProductModel) {
    const products = this._products.value;
    const index = products.findIndex((p) => p.id === product.id);
    products[index] = product;
    this._products.next(products);
  }

  orderbyName() {
    const products = this._products.value;
    products.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    });
    this._products.next(products);
  }
}
