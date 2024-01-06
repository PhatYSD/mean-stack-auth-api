import { Router, RequestHandler } from "express";
import { body } from "express-validator";

import { authCreateUser, authLoadCheck } from "../controllers";
import { checkTokenPage } from "../middlerwares";

const authRouter: Router = Router();

authRouter
    .get("/",
        checkTokenPage,
        authLoadCheck    
    );

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