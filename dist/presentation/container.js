"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../core/container");
const http_1 = require("./http");
const container_2 = require("../infrastructure/container");
function createContainer(config) {
    const container = {};
    const infraContainer = container_2.createInfraContainer();
    const coreContainer = container_1.createCoreContainer(infraContainer);
    if (config.init.http) {
        container.httpPresentation = new http_1.HttpPresentation({
            env: config.env,
            coreContainer,
        });
    }
    return container;
}
exports.default = createContainer;
