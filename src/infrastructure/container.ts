import { UserRepository } from './repository/user';

import { Container } from '../types/infrastructure';
import { MongoAdapter } from './adapter/mongo';

export function createInfraContainer(): Container {
  return {
    userRepository: new UserRepository({
      mongoAdapter: new MongoAdapter(),
    }),
  };
}
