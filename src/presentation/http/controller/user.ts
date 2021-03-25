/* eslint-disable class-methods-use-this */
import { findUserSchema } from '../schemas/user';
import { paginate } from '../helper/pagination';

import {
  HttpControllerConfig,
  HttpNext,
  HttpRequest,
  HttpResponse,
  HttpRouter,
  IHttpRoute,
} from '../../../types/presentation';

export class UserController implements IHttpRoute {
  private userUseCase: HttpControllerConfig['coreContainer']['userUseCase'];

  private validator: HttpControllerConfig['validator'];

  constructor({ coreContainer, validator }: HttpControllerConfig) {
    this.userUseCase = coreContainer.userUseCase;
    this.validator = validator;
  }

  register(router: HttpRouter): void {
    router.route('/v1/users')
      .get(
        this.validator(findUserSchema),
        this.findUser.bind(this),
      );
  }

  async findUser(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      const page = parseInt(req.query.page as string, 10);
      const name = req.query.name as string;
      const username = req.query.username as string;

      const users = await this.userUseCase.findUsers({
        filters: {
          name,
          username,
        },
        pagination: {
          page,
        },
      });

      const response = paginate({
        values: users,
        page,
      });

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
