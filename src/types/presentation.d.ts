import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

export type HttpRouter = Router;
export type HttpRequest = Request;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export interface IHttpPresentation {
  serve(): void;
}

export type HttpControllerConfig = {

};

export interface IHttpRoute {
  // eslint-disable-next-line no-unused-vars
  register(router: HttpRouter): void;
}
