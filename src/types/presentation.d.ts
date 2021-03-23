import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import { Container } from './core';

export type HttpRouter = Router;
export type HttpRequest = Request;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export interface IHttpPresentation {
  serve(): void;
}

export type HttpControllerConfig = {
  coreContainer: Container,
  // eslint-disable-next-line no-undef
  validator: typeof import('../presentation/http/middleware/validator').validator;
};

export interface IHttpRoute {
  // eslint-disable-next-line no-unused-vars
  register(router: HttpRouter): void;
}
