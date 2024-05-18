import { BranchRepository } from '@domain/repository';
import { CreateBranchUseCase, GetAllBranchUseCase } from '@domain/use-case';

export const CreateBranchUseCaseFactory = (
  BranchRepository: BranchRepository
) => new CreateBranchUseCase(BranchRepository);

export const GetAllBranchUseCaseFactory = (
  BranchRepository: BranchRepository
) => new GetAllBranchUseCase(BranchRepository);

export const BranchUseCaseProviders = {
  createBranch: {
    provide: CreateBranchUseCase,
    useFactory: CreateBranchUseCaseFactory,
    deps: [BranchRepository],
  },
  getAllBranch: {
    provide: GetAllBranchUseCase,
    useFactory: GetAllBranchUseCaseFactory,
    deps: [BranchRepository],
  },
};
