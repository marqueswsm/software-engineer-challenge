import { UseCaseContext } from '../../types/core';
import { IUserUseCase, User } from '../../types/user';

export class UserUseCase implements IUserUseCase {
  private userService: UseCaseContext['userService'];

  constructor(context: UseCaseContext) {
    this.userService = context.userService;
  }

  findUsers(params: Partial<User>): Promise<User[]> {
    return this.userService.findUsers(params);
  }
}
