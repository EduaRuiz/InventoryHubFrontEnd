<<<<<<< HEAD

export interface SaleEntity {
  id?: string;
  productName: string[];
  invoiceNumber: string;
  productPrice: string;
  quantity: string;


=======
export interface ISaleEntity {
  id: string;
  number: string;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  date: Date;
>>>>>>> Eduar
}
