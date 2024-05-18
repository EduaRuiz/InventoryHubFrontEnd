import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse, IUserModel, IUserRegister } from '@domain/models';
import { UserRepository } from '@domain/repository';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  override refresh(token: string, id: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `http://${environment.HOST_3003}/api/v1/refresh-token`,
      { token, id }
    );
  }
  override login(email: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `http://${environment.HOST_3003}/api/v1/login`,
      { email, password }
    );
  }
  constructor(private http: HttpClient) {
    super();
  }

  createUser(user: IUserRegister): Observable<IUserModel> {
    return this.http.post<IUserModel>(
      `http://${environment.HOST_3000}/api/v1/user/register`,
      user
    );
  }
}
