import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserRegister } from '../models/user-register.model';
import { ILoginResponse, IUserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export abstract class UserRepository {
  abstract createUser(user: IUserRegister): Observable<IUserModel>;
  abstract login(email: string, password: string): Observable<ILoginResponse>;

  abstract refresh(token: string, id: string): Observable<{ token: string }>;
}
