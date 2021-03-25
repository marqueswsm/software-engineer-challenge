"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose = require("mongoose");
const env_1 = require("./env");
mongoose.connect(env_1.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
function database(model, schema) {
    return mongoose.model(model, schema);
}
exports.database = database;
