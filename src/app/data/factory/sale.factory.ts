import { SaleRepository } from '@domain/repository';
import { CreateSaleUseCase } from '@domain/use-case';
import { GetAllSaleUseCase } from '@domain/use-case/sale/get-all.sale.use-case';
export const CreateSaleUseCaseFactory = (saleRepository: SaleRepository) =>
  new CreateSaleUseCase(saleRepository);
export const GetAllSaleUseCaseFactory = (saleRepository: SaleRepository) =>
  new GetAllSaleUseCase(saleRepository);

export const SaleUseCaseProviders = {
  createSale: {
    provide: CreateSaleUseCase,
    useFactory: CreateSaleUseCaseFactory,
    deps: [SaleRepository],
  },
  getAllSale: {
    provide: GetAllSaleUseCase,
    useFactory: GetAllSaleUseCaseFactory,
    deps: [SaleRepository],
  },
};
