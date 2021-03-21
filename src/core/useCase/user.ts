import { IUserUseCase, User } from '../../types/user';

export class UserUseCase implements IUserUseCase {
  // eslint-disable-next-line class-methods-use-this
  findUsers(params: Partial<User>): Promise<User[]> {
    console.log(params, 'Ok it is working');
    const resultado = [] as unknown as Promise<User[]>;
    return resultado;
  }
}
