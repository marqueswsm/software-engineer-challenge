"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    let status = 500;
    let name = 'Error';
    if (err.code === 'USERS_NOT_FOUND') {
        status = 204;
    }
    if (err.code === 'BAD_REQUEST') {
        name = err.code;
        status = 400;
    }
    res.status(status).send({
        name,
        message: err.message,
        details: err.details,
    });
}
exports.errorHandler = errorHandler;
