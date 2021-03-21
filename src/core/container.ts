import { UserRepository } from '../infrastructure/repository/user';
import { UserService } from './service/user';
import { UserUseCase } from './useCase/user';

export function createCoreContainer() {
  const repositoryContext = {
    userRepository: new UserRepository(),
  };

  const useCaseContext = {
    userService: new UserService(repositoryContext),
  };

  return {
    userUseCase: new UserUseCase(useCaseContext),
  };
}
