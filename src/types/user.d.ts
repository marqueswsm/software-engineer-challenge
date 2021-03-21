/* eslint-disable no-unused-vars */

export type User = {
  id: string;
  name: string;
  username: string;
}

export interface IUserRepository {
  findUsers(params: Partial<User>): Promise<User[]>;
}

export interface IUserService {
  findUsers(params: Partial<User>): Promise<User[]>;
}

export interface IUserUseCase {
  findUsers(params: Partial<User>): Promise<User[]>;
}
