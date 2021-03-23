import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { UserController } from './controller/user';

import { IHttpPresentation, IHttpRoute } from '../../types/presentation';
import { Container } from '../../types/core';
import { errorHandler } from './middleware/errorHandler';

type Config = {
  // eslint-disable-next-line no-undef
  env: typeof import('../../util/env').env;
  coreContainer: Container;
};

export class HttpPresentation implements IHttpPresentation {
  private env: Config['env'];

  private coreContainer: Config['coreContainer'];

  private app: express.Application;

  constructor(config: Config) {
    this.env = config.env;
    this.coreContainer = config.coreContainer;
  }

  initApp() {
    this.app = express();

    this.app.use(
      helmet(),
      bodyParser.json({
        limit: '500kb',
      }),
    );

    const controllers = [
      new UserController({
        coreContainer: this.coreContainer,
      }),
    ];

    controllers.forEach((route: IHttpRoute) => {
      const router = express.Router({ mergeParams: true });
      route.register(router);
      this.app.use(router);
    });

    this.app.get('/status', (_req, res, next) => {
      try {
        res.sendStatus(404);
      } catch (error) {
        next(error);
      }
    });

    this.app.use(errorHandler);
  }

  serve(): void {
    this.initApp();
    this.app.listen(this.env.httpPort);
  }
}
