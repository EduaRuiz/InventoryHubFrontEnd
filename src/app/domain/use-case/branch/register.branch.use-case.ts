import { IBranchModel, IBranchRegisterModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { Observable } from 'rxjs';

export class CreateBranchUseCase {
  constructor(private BranchRepository: BranchRepository) {}

  execute(Branch: IBranchRegisterModel): Observable<IBranchModel> {
    return this.BranchRepository.createBranch(Branch);
  }
}
