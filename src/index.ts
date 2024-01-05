import "dotenv/config";
import express, { Express, Request, Response } from "express";

import { Env, Conf } from "./utils";

const server: Express = express();
const { APP_PORT, DATABASE_MONGO_URI } = Env;

server.get("/", (_req: Request, res: Response) => {
    res.send({ message: "Welcome to mern stack auth API. Go to '/' path for used API." });
});

Conf(server, APP_PORT, DATABASE_MONGO_URI);