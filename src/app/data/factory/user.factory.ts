import { UserRepository } from '@domain/repository';
import { CreateUserUseCase, RefreshTokenUseCase } from '@domain/use-case';
import { LoginUseCase } from '@domain/use-case/user/login.user.use-case';

export const createUserUseCaseFactory = (userRepository: UserRepository) =>
  new CreateUserUseCase(userRepository);

export const loginUserUseCaseFactory = (userRepository: UserRepository) =>
  new LoginUseCase(userRepository);

export const refreshTokenUseCaseFactory = (userRepository: UserRepository) =>
  new RefreshTokenUseCase(userRepository);

export const UserUseCaseProviders = {
  createUser: {
    provide: CreateUserUseCase,
    useFactory: createUserUseCaseFactory,
    deps: [UserRepository],
  },
  login: {
    provide: LoginUseCase,
    useFactory: loginUserUseCaseFactory,
    deps: [UserRepository],
  },

  refresh: {
    provide: RefreshTokenUseCase,
    useFactory: refreshTokenUseCaseFactory,
    deps: [UserRepository],
  },
};
