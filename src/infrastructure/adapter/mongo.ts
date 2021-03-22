import { database } from '../../util/mongoose';
import { userSchema } from './schema/user';

import {
  IMongoAdapter,
  MongoAdapterConfig,
  MongoDatabase,
} from '../../types/infrastructure';

export class MongoAdapter implements IMongoAdapter {
  private tabName: string;

  private database: MongoDatabase;

  constructor(config?: MongoAdapterConfig) {
    this.tabName = 'User';
    this.database = config?.dbConn || database(this.tabName, userSchema);
  }

  get db() {
    return this.database;
  }

  set tableName(name: string) {
    this.tabName = name;
  }
}
