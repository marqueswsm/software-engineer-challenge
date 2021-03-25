"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./util/env");
const container_1 = require("./presentation/container");
class App {
    constructor({ http }) {
        this.http = http;
    }
    run() {
        var _a;
        const presentationContainer = container_1.default({
            env: env_1.env,
            init: {
                http: this.http,
            },
        });
        if (this.http) {
            (_a = presentationContainer.httpPresentation) === null || _a === void 0 ? void 0 : _a.serve();
        }
    }
}
exports.default = App;
const app = new App({
    http: env_1.env.httpActive,
});
setImmediate(() => {
    app.run();
});
