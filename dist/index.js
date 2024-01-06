"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const utils_1 = require("./utils");
const server = (0, express_1.default)();
const { APP_PORT, DATABASE_MONGO_URI } = utils_1.Env;
server.use(app_1.default);
server.get("/", (_req, res) => {
    res.send({ message: "Welcome to mern stack auth API. Go to '/' path for used API." });
});
(0, utils_1.Conf)(server, APP_PORT, DATABASE_MONGO_URI);
