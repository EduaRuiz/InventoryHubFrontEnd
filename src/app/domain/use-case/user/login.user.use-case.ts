import { ILoginResponse } from '@domain/models';
import { UserRepository } from '@domain/repository';
import { Observable, catchError } from 'rxjs';
export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(email: string, password: string): Observable<ILoginResponse> {
    return this.userRepository.login(email, password).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }
}
