import { IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class GetAllProductUseCase {
  constructor(private productRepository: ProductRepository<IProductModel>) {}

  execute(): Observable<IProductModel[]> {
    return this.productRepository.getAllProduct();
  }
}
