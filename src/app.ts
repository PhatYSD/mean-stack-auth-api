import cors from "cors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";

import { authRouter } from "./routers";

const app: Express = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (_req: Request, res: Response) => {
    res.send({ message: "Hello, Go to '/auth' for authentication" });
});

app.use("/api/auth", authRouter);

export default app;