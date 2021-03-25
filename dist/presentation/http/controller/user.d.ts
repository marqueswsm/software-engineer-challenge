import { HttpControllerConfig, HttpNext, HttpRequest, HttpResponse, HttpRouter, IHttpRoute } from '../../../types/presentation';
export declare class UserController implements IHttpRoute {
    private userUseCase;
    private validator;
    constructor({ coreContainer, validator }: HttpControllerConfig);
    register(router: HttpRouter): void;
    findUser(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
}
