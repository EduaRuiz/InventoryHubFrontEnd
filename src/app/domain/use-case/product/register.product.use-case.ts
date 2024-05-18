import { IProductModel, IProductRegisterModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository<IProductModel>) {}

  execute(product: IProductRegisterModel): Observable<IProductModel> {
    return this.productRepository.registerProduct(product);
  }
}
