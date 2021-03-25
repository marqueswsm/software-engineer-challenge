"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(context) {
        this.userRepository = context.userRepository;
    }
    findUsers(params) {
        return this.userRepository.findUsers(params);
    }
}
exports.UserService = UserService;
