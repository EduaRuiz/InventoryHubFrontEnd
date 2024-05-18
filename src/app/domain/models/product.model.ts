export interface IProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  branchId: string;
}

export interface IProductRegisterForm {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export interface IProductRegister {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  branchId: string;
}
