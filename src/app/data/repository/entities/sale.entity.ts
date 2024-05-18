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
}
