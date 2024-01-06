import "dotenv/config";
import express, { Express, Request, Response } from "express";

import app from "./app";
import { Env, Conf } from "./utils";

const server: Express = express();
const { APP_PORT, DATABASE_MONGO_URI } = Env;

server.use(app);

server.get("/", (_req: Request, res: Response) => {
    res.send({ message: "Welcome to mern stack auth API. Go to '/' path for used API." });
});

export default Conf(server, APP_PORT || 5001, DATABASE_MONGO_URI);