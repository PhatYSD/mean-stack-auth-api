import { Router } from "express";
import { body } from "express-validator";

import { authCreateUser } from "../controllers";

const authRouter: Router = Router();

authRouter
    .post("/",
        body("username")
            .trim()
            .notEmpty()
            .isLength({
                max: 16,
                min: 4
            }),
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        authCreateUser
    );

export default authRouter;