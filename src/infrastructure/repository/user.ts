import { IUserRepository, User } from '../../types/user';

export class UserRepository implements IUserRepository {
  // eslint-disable-next-line class-methods-use-this
  findUsers(params: Partial<User>): Promise<User[]> {
    console.log(params, 'Repository');

    const result = [] as unknown as Promise<User[]>;
    return result;
  }
}
