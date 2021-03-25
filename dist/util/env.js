"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = require("dotenv");
dotenv.config();
const env = {
    httpActive: process.env.HTTP_ACTIVE === 'true',
    httpPort: process.env.HTTP_PORT || '3000',
    mongoURI: process.env.MONGO_URI || '',
};
exports.env = env;
