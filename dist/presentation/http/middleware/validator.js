"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const R = require("ramda");
const error_1 = require("../../../util/error");
exports.validator = R.curryN(4, (schema, req, res, next) => {
    const validation = schema.validate(req, {
        abortEarly: false,
        stripUnknown: true,
        allowUnknown: true,
    });
    if (validation.error) {
        return next(new error_1.BadRequestError('Invalid request params', validation.error.details));
    }
    Object.assign(req, validation.value);
    return next();
});
