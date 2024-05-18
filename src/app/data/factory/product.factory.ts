import { IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import {
  CreateProductUseCase,
  GetAllProductUseCase,
  GetProductUseCase,
  RegisterQuantityUseCase,
} from '@domain/use-case';

export const CreateProductUseCaseFactory = (
  productRepository: ProductRepository<IProductModel>
) => new CreateProductUseCase(productRepository);

export const GetAllProductUseCaseFactory = (
  productRepository: ProductRepository<IProductModel>
) => new GetAllProductUseCase(productRepository);
export const RegisterQuantityUseCaseFactory = (
  productRepository: ProductRepository<IProductModel>
) => new RegisterQuantityUseCase(productRepository);

export const GetProductUseCaseFactory = (
  productRepository: ProductRepository<IProductModel>
) => new GetProductUseCase(productRepository);

export const ProductUseCaseProviders = {
  createProduct: {
    provide: CreateProductUseCase,
    useFactory: CreateProductUseCaseFactory,
    deps: [ProductRepository],
  },
  registerQuantity: {
    provide: RegisterQuantityUseCase,
    useFactory: RegisterQuantityUseCaseFactory,
    deps: [ProductRepository],
  },
  getAllProduct: {
    provide: GetAllProductUseCase,
    useFactory: GetAllProductUseCaseFactory,
    deps: [ProductRepository],
  },
  getProduct: {
    provide: GetProductUseCase,
    useFactory: GetProductUseCase,
    deps: [ProductRepository],
  },
};
