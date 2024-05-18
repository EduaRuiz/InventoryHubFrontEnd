import { IBranchModel, IBranchRegisterModel } from '@domain/models';
import { Observable } from 'rxjs';

export abstract class BranchRepository {
  abstract createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel>;
  abstract getAllBranch(): Observable<IBranchModel[]>;
}
