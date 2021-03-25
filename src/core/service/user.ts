import { ServiceContext } from '../../types/core';
import { IUserService, Pagination, User } from '../../types/user';

export class UserService implements IUserService {
  private userRepository: ServiceContext['userRepository'];

  constructor(context: ServiceContext) {
    this.userRepository = context.userRepository;
  }

  findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]> {
    return this.userRepository.findUsers(params);
  }
}
