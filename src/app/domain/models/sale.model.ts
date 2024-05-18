<<<<<<< HEAD

export interface SaleModel {
    id?: string;
    productName: string[];
    invoiceNumber: string;
    productPrice: string;
    quantity: string;
  
  
  }
  
=======
export interface ISaleModel {
  products: {
    id: string;
    quantity: number;
  }[];
  branchId: string;
  type?: string;
  userId?: string;
  discount?: number;
  email?: string;
}
>>>>>>> Eduar
