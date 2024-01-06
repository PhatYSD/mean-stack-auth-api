"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const Env = (0, envalid_1.cleanEnv)(process.env, {
    APP_PORT: (0, envalid_1.num)(),
    JWT_AUTH_SECRET: (0, envalid_1.str)(),
    DATABASE_MONGO_URI: (0, envalid_1.str)()
});
exports.default = Env;
