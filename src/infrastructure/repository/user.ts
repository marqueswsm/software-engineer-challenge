import { IMongoAdapter } from '../../types/infrastructure';
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

    const query = this.mongoAdapter.db.find().sort('-priority');

    if (name) {
      query.where({ name });
    }

    if (username) {
      query.where({ username: params.username });
    }

    const users = await query.exec() as User[];
    return users;
  }
}
