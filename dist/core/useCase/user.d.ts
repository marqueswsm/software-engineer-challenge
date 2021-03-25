import { UseCaseContext } from '../../types/core';
import { IUserUseCase, User } from '../../types/user';
export declare class UserUseCase implements IUserUseCase {
    private userService;
    constructor(context: UseCaseContext);
    findUsers(params: Partial<User>): Promise<User[]>;
}
