import { UserRepository } from '@domain/repository';
import { Observable } from 'rxjs';
export class RefreshTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(token: string, id: string): Observable<{ token: string }> {
    return this.userRepository.refresh(token, id);
  }
}
