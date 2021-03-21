/* eslint-disable class-methods-use-this */
import {
  HttpNext,
  HttpRequest,
  HttpResponse,
  HttpRouter,
  IHttpRoute,
} from '../../../types/presentation';

export class UserController implements IHttpRoute {
  register(router: HttpRouter): void {
    router.route('/v1/users')
      .get(
        this.findUser.bind(this),
      );
  }

  // eslint-disable-next-line no-unused-vars
  async findUser(req: HttpRequest, res: HttpResponse, next: HttpNext) {
    try {
      // something
    } catch (error) {
      throw new Error('Here is just crazy persons');
    }
  }
}
