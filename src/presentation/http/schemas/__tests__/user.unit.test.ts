import * as Chance from 'chance';

import { findUserSchema } from '../user';

describe('User schema unit tests', () => {
  const chance = new Chance();

  describe('#findUser', () => {
    it('show accept schema', () => {
      const params = {
        query: {
          name: chance.name(),
          username: chance.string(),
          page: chance.integer({ min: 1, max: 2 }),
        },
      };

      const { error } = findUserSchema.validate(params);

      expect(error).toBeUndefined();
    });

    it('show accept schema when no params are provided', () => {
      const params = {
        query: {},
      };

      const { error } = findUserSchema.validate(params);

      expect(error).toBeUndefined();
    });

    it('show accept schema without name', () => {
      const params = {
        query: {
          username: chance.string(),
          page: chance.integer({ min: 1, max: 2 }),
        },
      };

      const { error } = findUserSchema.validate(params);

      expect(error).toBeUndefined();
    });

    it('show accept schema without username', () => {
      const params = {
        query: {
          name: chance.name(),
          page: chance.integer({ min: 1, max: 2 }),
        },
      };

      const { error } = findUserSchema.validate(params);

      expect(error).toBeUndefined();
    });

    it('show accept schema without page', () => {
      const params = {
        query: {
          name: chance.name(),
          username: chance.string(),
        },
      };

      const { error } = findUserSchema.validate(params);

      expect(error).toBeUndefined();
    });

    it('show throw if page are send with 0', () => {
      const params = {
        query: {
          name: chance.name(),
          username: chance.string(),
          page: 0,
        },
      };

      const { error } = findUserSchema.validate(params);

      expect(error.message).toEqual('"query.page" must be a positive number');
    });
  });
});
