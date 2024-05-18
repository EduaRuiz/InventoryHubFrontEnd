import { IProductAddQuantityModel, IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class RegisterQuantityUseCase {
  constructor(private productRepository: ProductRepository<IProductModel>) {}

  execute(
    id: string,
    product: IProductAddQuantityModel
  ): Observable<IProductModel> {
    return this.productRepository.registerQuantity(id, product);
  }
}
