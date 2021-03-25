"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserSchema = void 0;
const joi = require("joi");
exports.findUserSchema = joi.object({
    query: {
        name: joi.string(),
        username: joi.string(),
        page: joi.number().positive().default(1),
    },
});
