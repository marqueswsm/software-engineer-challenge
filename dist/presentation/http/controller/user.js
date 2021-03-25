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
exports.UserController = void 0;
const pagination_1 = require("../helper/pagination");
const user_1 = require("../schemas/user");
class UserController {
    constructor({ coreContainer, validator }) {
        this.userUseCase = coreContainer.userUseCase;
        this.validator = validator;
    }
    register(router) {
        router.route('/v1/users')
            .get(this.validator(user_1.findUserSchema), this.findUser.bind(this));
    }
    findUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page;
                const name = req.query.name;
                const username = req.query.username;
                const users = yield this.userUseCase.findUsers({
                    name,
                    username,
                });
                const response = pagination_1.paginate({
                    entity: 'users',
                    values: users,
                    page,
                });
                res.status(200).send(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
