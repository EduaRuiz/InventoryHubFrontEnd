import { IProductModel } from '@domain/models';
import { ProductRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository<IProductModel>) {}

  execute(id: string): Observable<IProductModel> {
    return this.productRepository.getProductById(id);
  }
}
