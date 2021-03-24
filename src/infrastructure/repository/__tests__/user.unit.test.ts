import * as Chance from 'chance';

import { UserRepository } from '../user';

describe('User repository unit tests', () => {
  const chance = new Chance();

  describe('#findUser', () => {
    it('should call find with name and username', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => ({
              sort: jest.fn(() => ({
                sort: jest.fn(() => ({
                  exec: jest.fn().mockResolvedValue(fakeUsers),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      await userRepository.findUsers({});
      expect(context.mongoAdapter.db.find).toHaveBeenCalledWith({}, 'name username');
    });

    it('should call find sort with -priority', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const fakeSort = {
        sort: jest.fn(() => ({
          sort: jest.fn(() => ({
            exec: jest.fn().mockResolvedValue(fakeUsers),
          })),
        })),
      };

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => fakeSort),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      await userRepository.findUsers({});
      expect(fakeSort.sort).toHaveBeenCalledWith('-priority');
    });

    it('should call sort with name after call sort with priority', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const fakeSecondSort = {
        sort: jest.fn(() => ({
          exec: jest.fn().mockResolvedValue(fakeUsers),
        })),
      };

      const fakeSort = {
        sort: jest.fn(() => fakeSecondSort),
      };

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => fakeSort),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      await userRepository.findUsers({});
      expect(fakeSecondSort.sort).toHaveBeenCalledWith('name');
    });

    it('should call where with name when a name is provided', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const where = jest.fn();

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => ({
              sort: jest.fn(() => ({
                sort: jest.fn(() => ({
                  where,
                  exec: jest.fn().mockResolvedValue(fakeUsers),
                })),
              })),
            })),
          },
        },
      };
      // @ts-ignore
      const userRepository = new UserRepository(context);

      const params = {
        name: chance.name(),
      };

      await userRepository.findUsers(params);

      expect(where).toHaveBeenCalledWith({
        name: {
          $regex: `.*${params.name}.*`,
          $options: 'i',
        },
      });
    });

    it('should call where with username when a username is provided', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const where = jest.fn();

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => ({
              sort: jest.fn(() => ({
                sort: jest.fn(() => ({
                  where,
                  exec: jest.fn().mockResolvedValue(fakeUsers),
                })),
              })),
            })),
          },
        },
      };
      // @ts-ignore
      const userRepository = new UserRepository(context);

      const params = {
        username: chance.string(),
      };

      await userRepository.findUsers(params);

      expect(where).toHaveBeenCalledWith({
        username: {
          $regex: `.*${params.username}.*`,
          $options: 'i',
        },
      });
    });

    it('should throw when no user are found', async () => {
      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => ({
              sort: jest.fn(() => ({
                sort: jest.fn(() => ({
                  exec: jest.fn().mockResolvedValue([]),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      expect(userRepository.findUsers({})).rejects.toThrow('No users found');
    });

    it('should return a valid response', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const context = {
        mongoAdapter: {
          db: {
            find: jest.fn(() => ({
              sort: jest.fn(() => ({
                sort: jest.fn(() => ({
                  exec: jest.fn().mockResolvedValue(fakeUsers),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      const response = await userRepository.findUsers({});
      expect(response).toEqual(fakeUsers);
    });
  });
});
