import { ContainerConfig } from '../types/core';
import { UserService } from './service/user';
import { UserUseCase } from './useCase/user';

export function createCoreContainer(config: ContainerConfig) {
  const serviceContext = {
    userRepository: config.userRepository,
  };

  const useCaseContext = {
    userService: new UserService(serviceContext),
  };

  return {
    userUseCase: new UserUseCase(useCaseContext),
  };
}
