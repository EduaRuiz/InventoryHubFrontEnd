export interface IProductSaleModel {
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  branchId: string;
  id: string;
  number: number;
  total: number;
  date: Date;
  type: string;
}
