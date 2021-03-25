/* eslint-disable class-methods-use-this */
import { paginate } from '../helper/pagination';
import { findUserSchema } from '../schemas/user';

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
      console.log('Opaaa');
      const page = req.query.page as string;
      const name = req.query.name as string;
      const username = req.query.username as string;

      const users = await this.userUseCase.findUsers({
        name,
        username,
      });

      const response = paginate({
        entity: 'users',
        values: users,
        page,
      });

      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
