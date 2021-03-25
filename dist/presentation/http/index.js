"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpPresentation = void 0;
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const user_1 = require("./controller/user");
const validator_1 = require("./middleware/validator");
const errorHandler_1 = require("./middleware/errorHandler");
class HttpPresentation {
    constructor(config) {
        this.env = config.env;
        this.coreContainer = config.coreContainer;
        this.app = express();
    }
    initApp() {
        this.app = express();
        this.app.use(helmet(), bodyParser.json({
            limit: '500kb',
        }));
        const controllers = [
            new user_1.UserController({
                coreContainer: this.coreContainer,
                validator: validator_1.validator,
            }),
        ];
        controllers.forEach((route) => {
            const router = express.Router({ mergeParams: true });
            route.register(router);
            this.app.use(router);
        });
        this.app.use(errorHandler_1.errorHandler);
    }
    serve() {
        this.initApp();
        this.app.listen(this.env.httpPort);
    }
}
exports.HttpPresentation = HttpPresentation;
