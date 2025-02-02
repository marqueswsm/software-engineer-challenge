import { AnySchema } from 'joi';
import * as R from 'ramda';

import { BadRequestError } from '../../../util/error';

import { HttpRequest, HttpResponse, HttpNext } from '../../../types/presentation';

export const validator = R.curryN(
  4,
  (schema: AnySchema, req: HttpRequest, res: HttpResponse, next: HttpNext) => {
    const validation = schema.validate(req, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      return next(new BadRequestError('Invalid request params', validation.error.details));
    }

    Object.assign(req, validation.value);

    return next();
  },
);
