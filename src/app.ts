import cors from "cors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";

import { authRouter } from "./routers";

const app: Express = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
    const ip =
        req.headers["cf-connecting-ip"] ||
        req.headers["x-real-ip"] ||
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress || req.ip || "";
    res.send({ message: "Hello, Go to '/auth' for authentication", ip });
});

app.use("/api/auth", authRouter);

export default app;