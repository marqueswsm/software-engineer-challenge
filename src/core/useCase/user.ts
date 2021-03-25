import { UseCaseContext } from '../../types/core';
import { IUserUseCase, Pagination, User } from '../../types/user';

export class UserUseCase implements IUserUseCase {
  private userService: UseCaseContext['userService'];

  constructor(context: UseCaseContext) {
    this.userService = context.userService;
  }

  findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]> {
    return this.userService.findUsers(params);
  }
}
