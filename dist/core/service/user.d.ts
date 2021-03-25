import { ServiceContext } from '../../types/core';
import { IUserService, User } from '../../types/user';
export declare class UserService implements IUserService {
    private userRepository;
    constructor(context: ServiceContext);
    findUsers(params: Partial<User>): Promise<User[]>;
}
