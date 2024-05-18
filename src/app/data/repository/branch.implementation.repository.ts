import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBranchModel, IBranchRegisterModel } from '@domain/models';
import { BranchRepository } from '@domain/repository';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class BranchImplementationRepository extends BranchRepository {
  constructor(private http: HttpClient) {
    super();
  }

  createBranch(Branch: IBranchRegisterModel): Observable<IBranchModel> {
    return this.http.post<IBranchModel>(
      `http://${environment.HOST_3000}/api/v1/branch/register`,
      Branch
    );
  }

  getAllBranch(): Observable<IBranchModel[]> {
    return this.http.get<IBranchModel[]>(
      `http://${environment.HOST_3001}/api/v1/branches/`
    );
  }
}
