import { IUserModel, IUserRegister } from '@domain/models';
import { UserRepository } from '@domain/repository';
import { Observable } from 'rxjs';
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(user: IUserRegister): Observable<IUserModel> {
    return this.userRepository.createUser(user);
  }
}
