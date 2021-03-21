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

  // eslint-disable-next-line no-unused-vars
  async findUser(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      await this.userUseCase.findUsers({});
    } catch (error) {
      throw new Error('Here is just crazy persons');
    }
  }
}
