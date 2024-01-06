import "dotenv/config"; // Load environment variables from .env file
import express, { Express, Request, Response } from "express";

import app from "./app";
import { Env, Conf } from "./utils";

const server: Express = express();
const { PORT, DATABASE_MONGO_URI } = Env;

server.use(app);

// Define a route for the root path ("/") to send a welcome message
server.get("/", (_req: Request, res: Response) => {
    res.send({ message: "Welcome to mern stack auth API. Go to '/' path for used API." });
});

Conf(server, PORT || 5001, DATABASE_MONGO_URI); // Configure the server using the Conf function with specified port and database URI