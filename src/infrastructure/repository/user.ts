import { IMongoAdapter } from '../../types/infrastructure';
import { UsersNotFound } from '../../util/error';

import { IUserRepository, User } from '../../types/user';

type Context = {
  mongoAdapter: IMongoAdapter,
}

export class UserRepository implements IUserRepository {
  private mongoAdapter: Context['mongoAdapter'];

  constructor(context: Context) {
    this.mongoAdapter = context.mongoAdapter;
  }

  async findUsers(params: Partial<User>): Promise<User[]> {
    const { name, username } = params;

    const query = this.mongoAdapter.db
      .find({}, 'name username')
      .sort('-priority')
      .sort('name');

    if (name) {
      query.where({
        name: {
          $regex: `.*${name}.*`,
          $options: 'i',
        },
      });
    }

    if (username) {
      query.where({
        username: {
          $regex: `.*${username}.*`,
          $options: 'i',
        },
      });
    }

    const users = await query.exec() as User[];

    if (!users.length) {
      throw new UsersNotFound('No users found');
    }

    return users;
  }
}
