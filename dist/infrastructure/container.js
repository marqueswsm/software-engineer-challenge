"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfraContainer = void 0;
const user_1 = require("./repository/user");
const mongo_1 = require("./adapter/mongo");
function createInfraContainer() {
    return {
        userRepository: new user_1.UserRepository({
            mongoAdapter: new mongo_1.MongoAdapter(),
        }),
    };
}
exports.createInfraContainer = createInfraContainer;
