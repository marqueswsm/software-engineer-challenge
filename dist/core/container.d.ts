import { ContainerConfig } from '../types/core';
import { UserUseCase } from './useCase/user';
export declare function createCoreContainer(config: ContainerConfig): {
    userUseCase: UserUseCase;
};
