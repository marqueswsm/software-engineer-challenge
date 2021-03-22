/* eslint-disable class-methods-use-this */
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

  constructor({ coreContainer }) {
    this.userUseCase = coreContainer.userUseCase;
  }

  register(router: HttpRouter): void {
    router.route('/v1/users')
      .get(
        this.findUser.bind(this),
      );
  }

  async findUser(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
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
      next(error);
    }
  }
}
