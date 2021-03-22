/* eslint-disable class-methods-use-this */
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
      const response = await this.userUseCase.findUsers({});

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
