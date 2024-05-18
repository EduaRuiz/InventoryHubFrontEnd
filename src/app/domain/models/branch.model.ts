<<<<<<< HEAD
import { productModel } from './product.model';
import { SaleModel } from './sale.model';
import { UserModel } from './user.model';
=======
import { IProductModel } from './product.model';
import { IUserModel } from './user.model';
>>>>>>> Eduar

export interface IBranchModel {
  id: string;
  name: string;
  location: string;
<<<<<<< HEAD
  products: productModel[];
  users: UserModel[];
  sales: SaleModel[]
=======
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
>>>>>>> Eduar
}
