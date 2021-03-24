import * as Chance from 'chance';

import { UserUseCase } from '../user';

describe('User usecase unit tests', () => {
  const chance = new Chance();

  describe('#findUsers', () => {
    it('should call findUsers with a valid body', async () => {
      const useCaseContext = {
        userService: {
          findUsers: jest.fn(),
        },
      };

      const userUseCase = new UserUseCase(useCaseContext);

      const params = {
        name: chance.name(),
        username: chance.string(),
      };

      await userUseCase.findUsers(params);

      expect(useCaseContext.userService.findUsers).toHaveBeenCalledWith(params);
    });

    it('should call findUsers without properties', async () => {
      const useCaseContext = {
        userService: {
          findUsers: jest.fn(),
        },
      };

      const userUseCase = new UserUseCase(useCaseContext);

      const params = {};

      await userUseCase.findUsers(params);

      expect(useCaseContext.userService.findUsers).toHaveBeenCalledWith(params);
    });

    it('should throw when repository throw', async () => {
      const useCaseContext = {
        userService: {
          findUsers: jest.fn().mockRejectedValue(new Error('Some error')),
        },
      };

      const userUseCase = new UserUseCase(useCaseContext);

      await expect(() => userUseCase.findUsers({})).rejects.toThrow('Some error');
    });
  });
});
