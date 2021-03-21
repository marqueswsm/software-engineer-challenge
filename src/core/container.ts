import { UserUseCase } from './useCase/user';

export function createCoreContainer() {
  return {
    userUseCase: new UserUseCase(),
  };
}
