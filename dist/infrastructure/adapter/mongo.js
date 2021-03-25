"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAdapter = void 0;
const mongoose_1 = require("../../util/mongoose");
const user_1 = require("./schema/user");
class MongoAdapter {
    constructor(config) {
        this.tabName = 'User';
        this.database = (config === null || config === void 0 ? void 0 : config.dbConn) || mongoose_1.database(this.tabName, user_1.userSchema);
    }
    get db() {
        return this.database;
    }
    set tableName(name) {
        this.tabName = name;
    }
}
exports.MongoAdapter = MongoAdapter;
