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
