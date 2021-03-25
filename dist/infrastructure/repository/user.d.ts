import { IMongoAdapter } from '../../types/infrastructure';
import { IUserRepository, User } from '../../types/user';
declare type Context = {
    mongoAdapter: IMongoAdapter;
};
export declare class UserRepository implements IUserRepository {
    private mongoAdapter;
    constructor(context: Context);
    findUsers(params: Partial<User>): Promise<User[]>;
}
export {};
