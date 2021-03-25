"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const error_1 = require("../../util/error");
class UserRepository {
    constructor(context) {
        this.mongoAdapter = context.mongoAdapter;
    }
    findUsers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, username } = params;
            const query = this.mongoAdapter.db
                .find({}, 'name username')
                .sort('-priority')
                .sort('name');
            if (name) {
                query.where({
                    name: {
                        $regex: `.*${name}.*`,
                        $options: 'i',
                    },
                });
            }
            if (username) {
                query.where({
                    username: {
                        $regex: `.*${username}.*`,
                        $options: 'i',
                    },
                });
            }
            const users = yield query.exec();
            if (!users.length) {
                throw new error_1.UsersNotFound('No users found');
            }
            return users;
        });
    }
}
exports.UserRepository = UserRepository;
