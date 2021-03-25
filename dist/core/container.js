"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoreContainer = void 0;
const user_1 = require("./service/user");
const user_2 = require("./useCase/user");
function createCoreContainer(config) {
    const serviceContext = {
        userRepository: config.userRepository,
    };
    const useCaseContext = {
        userService: new user_1.UserService(serviceContext),
    };
    return {
        userUseCase: new user_2.UserUseCase(useCaseContext),
    };
}
exports.createCoreContainer = createCoreContainer;
