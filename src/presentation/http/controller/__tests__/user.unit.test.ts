import * as Chance from 'chance';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import { UserController } from '../user';

describe('User controller unit tests', () => {
  const chance = new Chance();

  describe('#findUser', () => {
    it('should call use case to find user with name and username', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const params = {
        name: chance.name(),
        username: chance.string(),
        page: chance.string({ numeric: true, length: 1 }),
      };

      const coreContainer = {
        userUseCase: {
          findUsers: jest.fn(),
        },
      };

      req.setQuery(params);

      // @ts-ignore
      const controller = new UserController({ coreContainer, validator });

      // @ts-ignore
      await controller.findUser(req, res, next);

      expect(coreContainer.userUseCase.findUsers).toHaveBeenCalledWith({
        name: params.name,
        username: params.username,
      });
    });

    it('should call use case to find user just with name', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const params = {
        name: chance.name(),
        page: chance.string({ numeric: true, length: 1 }),
      };

      const coreContainer = {
        userUseCase: {
          findUsers: jest.fn(),
        },
      };

      req.setQuery(params);

      // @ts-ignore
      const controller = new UserController({ coreContainer, validator });

      // @ts-ignore
      await controller.findUser(req, res, next);

      expect(coreContainer.userUseCase.findUsers).toHaveBeenCalledWith({
        name: params.name,
      });
    });

    it('should call use case to find user just with username', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const params = {
        username: chance.string(),
        page: chance.string({ numeric: true, length: 1 }),
      };

      const coreContainer = {
        userUseCase: {
          findUsers: jest.fn(),
        },
      };

      req.setQuery(params);

      // @ts-ignore
      const controller = new UserController({ coreContainer, validator });

      // @ts-ignore
      await controller.findUser(req, res, next);

      expect(coreContainer.userUseCase.findUsers).toHaveBeenCalledWith({
        username: params.username,
      });
    });

    it('should call next if use case throw', async () => {
      const req = new Request();
      const res = new Response();
      const next = jest.fn();

      const validator = jest.fn();

      const params = {
        name: chance.name(),
        username: chance.string(),
        page: chance.string({ numeric: true, length: 1 }),
      };

      const coreContainer = {
        userUseCase: {
          findUsers: jest.fn(() => {
            throw new Error('Error');
          }),
        },
      };

      req.setQuery(params);

      // @ts-ignore
      const controller = new UserController({ coreContainer, validator });

      // @ts-ignore
      await controller.findUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
