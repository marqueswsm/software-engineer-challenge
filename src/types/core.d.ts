import { Container as infraContainer } from './infrastructure';

import { IUserService, IUserUseCase } from './user';

export type ContainerConfig = {
  userRepository: infraContainer['userRepository'];
}

export type Container = {
  userUseCase: IUserUseCase;
};

export type ServiceContext = {
  userRepository: ContainerConfig['userRepository'];
}

export type UseCaseContext = {
  userService: IUserService;
};
