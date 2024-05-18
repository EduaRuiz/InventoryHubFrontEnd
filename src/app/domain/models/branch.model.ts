import { IProductModel } from './product.model';
import { IUserModel } from './user.model';

export interface IBranchModel {
  id: string;
  name: string;
  location: string;
  products: IProductModel[];
  users: IUserModel[];
}

export interface IBranchRegisterForm {
  name: string;
  city: string;
  country: string;
}

export interface IBranchRegister {
  name: string;
  location: {
    city: string;
    country: string;
  };
}
