import { IMongoAdapter } from '../../types/infrastructure';
import { UsersNotFound } from '../../util/error';

import { IUserRepository, Pagination, User } from '../../types/user';

type Context = {
  mongoAdapter: IMongoAdapter,
}

export class UserRepository implements IUserRepository {
  private mongoAdapter: Context['mongoAdapter'];

  constructor(context: Context) {
    this.mongoAdapter = context.mongoAdapter;
  }

  async findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]> {
    const { name, username } = params.filters;
    const { page = 0 } = params.pagination;

    const query = this.mongoAdapter.db
      .find({}, 'name username')
      .sort('-priority')
      .sort('name')
      .limit(15)
      .skip((page - 1) * 15);

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
