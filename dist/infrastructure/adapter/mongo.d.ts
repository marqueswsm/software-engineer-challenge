import { IMongoAdapter, MongoAdapterConfig } from '../../types/infrastructure';
export declare class MongoAdapter implements IMongoAdapter {
    private tabName;
    private database;
    constructor(config?: MongoAdapterConfig);
    get db(): any;
    set tableName(name: string);
}
