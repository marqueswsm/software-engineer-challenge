import * as joi from 'joi';

export const findUserSchema = joi.object({
  query: {
    name: joi.string(),
    username: joi.string(),
    page: joi.number().positive().default(1),
  },
});
