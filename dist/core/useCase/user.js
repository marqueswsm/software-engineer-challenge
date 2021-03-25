"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
class UserUseCase {
    constructor(context) {
        this.userService = context.userService;
    }
    findUsers(params) {
        return this.userService.findUsers(params);
    }
}
exports.UserUseCase = UserUseCase;
