"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersNotFound = exports.BadRequestError = void 0;
class CustomError extends Error {
    constructor(code, message = null, details = null) {
        super(message || code);
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
class BadRequestError extends CustomError {
    constructor(message, details) {
        super('BAD_REQUEST', message, details);
    }
}
exports.BadRequestError = BadRequestError;
class UsersNotFound extends CustomError {
    constructor(message, details) {
        super('USERS_NOT_FOUND', message, details);
    }
}
exports.UsersNotFound = UsersNotFound;
