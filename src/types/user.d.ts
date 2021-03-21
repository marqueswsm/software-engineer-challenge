/* eslint-disable no-unused-vars */

export type User = {
  id: string;
  name: string;
  username: string;
}

export interface IUserUseCase {
  findUsers(params: Partial<User>): Promise<User[]>;
}
