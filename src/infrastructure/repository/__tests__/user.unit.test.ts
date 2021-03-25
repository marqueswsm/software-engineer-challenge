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
                  limit: jest.fn(() => ({
                    skip: jest.fn(() => ({
                      exec: jest.fn().mockResolvedValue(fakeUsers),
                    })),
                  })),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      await userRepository.findUsers({
        filters: {},
        pagination: {},
      });
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
            limit: jest.fn(() => ({
              skip: jest.fn(() => ({
                exec: jest.fn().mockResolvedValue(fakeUsers),
              })),
            })),
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

      await userRepository.findUsers({
        filters: {},
        pagination: {},
      });
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
          limit: jest.fn(() => ({
            skip: jest.fn(() => ({
              exec: jest.fn().mockResolvedValue(fakeUsers),
            })),
          })),
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

      await userRepository.findUsers({
        filters: {},
        pagination: {},
      });
      expect(fakeSecondSort.sort).toHaveBeenCalledWith('name');
    });

    it('should call limit with the defined value', async () => {
      const fakeUsers = [
        {
          _id: chance.guid(),
          name: chance.name(),
          username: chance.string(),
        },
      ];

      const fakeLimit = {
        limit: jest.fn(() => ({
          skip: jest.fn(() => ({
            exec: jest.fn().mockResolvedValue(fakeUsers),
          })),
        })),
      };

      const fakeSecondSort = {
        sort: jest.fn(() => (fakeLimit)),
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

      await userRepository.findUsers({
        filters: {},
        pagination: {},
      });
      expect(fakeLimit.limit).toHaveBeenCalledWith(15);
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
                  limit: jest.fn(() => ({
                    skip: jest.fn(() => ({
                      where,
                      exec: jest.fn().mockResolvedValue(fakeUsers),
                    })),
                  })),
                })),
              })),
            })),
          },
        },
      };
      // @ts-ignore
      const userRepository = new UserRepository(context);

      const params = {
        filters: {
          name: chance.name(),
        },
        pagination: {},
      };

      await userRepository.findUsers(params);

      expect(where).toHaveBeenCalledWith({
        name: {
          $regex: `.*${params.filters.name}.*`,
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
                  limit: jest.fn(() => ({
                    skip: jest.fn(() => ({
                      where,
                      exec: jest.fn().mockResolvedValue(fakeUsers),
                    })),
                  })),
                })),
              })),
            })),
          },
        },
      };
      // @ts-ignore
      const userRepository = new UserRepository(context);

      const params = {
        filters: {
          username: chance.string(),
        },
        pagination: {},
      };

      await userRepository.findUsers(params);

      expect(where).toHaveBeenCalledWith({
        username: {
          $regex: `.*${params.filters.username}.*`,
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
                  limit: jest.fn(() => ({
                    skip: jest.fn(() => ({
                      exec: jest.fn().mockResolvedValue([]),
                    })),
                  })),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      expect(userRepository.findUsers({
        filters: {},
        pagination: {},
      })).rejects.toThrow('No users found');
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
                  limit: jest.fn(() => ({
                    skip: jest.fn(() => ({
                      exec: jest.fn().mockResolvedValue(fakeUsers),
                    })),
                  })),
                })),
              })),
            })),
          },
        },
      };

      // @ts-ignore
      const userRepository = new UserRepository(context);

      const response = await userRepository.findUsers({
        filters: {},
        pagination: {},
      });
      expect(response).toEqual(fakeUsers);
    });
  });
});
