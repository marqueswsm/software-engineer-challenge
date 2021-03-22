import * as mongoose from 'mongoose';

import { IUserRepository } from './user';

export type MongoDatabase = any;

export interface MongoAdapterConfig {
  dbConn: MongoDatabase;
}

export interface IMongoAdapter {
  db: mongoose.Model<any>;
  tableName: string;
}

export type Container = {
  userRepository: IUserRepository;
};
