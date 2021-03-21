import { UserRepository } from './repository/user';

import { Container } from '../types/infrastructure';

export function createInfraContainer(): Container {
  return {
    userRepository: new UserRepository(),
  };
}
