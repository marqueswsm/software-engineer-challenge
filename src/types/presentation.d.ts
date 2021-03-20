import {
  Router,
} from 'express';

export type HttpRouter = Router;

export interface IHttpPresentation {
  serve(): void;
}

export type HttpControllerConfig = {

};

export interface IHttpRoute {
  // eslint-disable-next-line no-unused-vars
  register(router: HttpRouter): void;
}
