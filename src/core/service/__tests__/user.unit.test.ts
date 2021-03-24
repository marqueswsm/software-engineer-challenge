import * as Chance from 'chance';

import { UserService } from '../user';

describe('User usecase unit tests', () => {
  const chance = new Chance();

  describe('#findUsers', () => {
    it('should call findUsers with a valid body', async () => {
      const serviceContext = {
        userRepository: {
          findUsers: jest.fn(),
        },
      };

      const userService = new UserService(serviceContext);

      const params = {
        name: chance.name(),
        username: chance.string(),
      };

      await userService.findUsers(params);

      expect(serviceContext.userRepository.findUsers).toHaveBeenCalledWith(params);
    });

    it('should call findUsers without properties', async () => {
      const serviceContext = {
        userRepository: {
          findUsers: jest.fn(),
        },
      };

      const userService = new UserService(serviceContext);

      const params = {};

      await userService.findUsers(params);

      expect(serviceContext.userRepository.findUsers).toHaveBeenCalledWith(params);
    });

    it('should throw when repository throw', async () => {
      const serviceContext = {
        userRepository: {
          findUsers: jest.fn().mockRejectedValue(new Error('Some error')),
        },
      };

      const userService = new UserService(serviceContext);

      await expect(() => userService.findUsers({})).rejects.toThrow('Some error');
    });
  });
});
