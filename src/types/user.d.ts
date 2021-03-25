/* eslint-disable no-unused-vars */

export type User = {
  id: string;
  name: string;
  username: string;
}

export type Pagination = {
  page: number;
}

export interface IUserRepository {
  findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]>;
}

export interface IUserService {
  findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]>;
}

export interface IUserUseCase {
  findUsers(params: {
    filters: Partial<User>,
    pagination: Partial<Pagination>,
  }): Promise<User[]>;
}
