import { IBranchModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class GetAllBranchUseCase {
  constructor(private BranchRepository: BranchRepository) {}

  execute(): Observable<IBranchModel[]> {
    return this.BranchRepository.getAllBranch();
  }
}
