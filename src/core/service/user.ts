import { ServiceContext } from '../../types/core';
import { IUserService, User } from '../../types/user';

export class UserService implements IUserService {
  private userRepository: ServiceContext['userRepository'];

  constructor(context: ServiceContext) {
    this.userRepository = context.userRepository;
  }

  findUsers(params: Partial<User>): Promise<User[]> {
    return this.userRepository.findUsers(params);
  }
}
