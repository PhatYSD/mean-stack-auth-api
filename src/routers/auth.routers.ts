import { Router } from "express";
import { body } from "express-validator";

import { authCreateUser, authLoadCheck, authResetPassword, authDeleteAccount, authLogin, authForgetPasswordCheck, authForgetPasswordChange } from "../controllers";
import { checkTokenPage } from "../middlerwares";

const authRouter: Router = Router();

// check token on client
authRouter
    .get("/",
        checkTokenPage,
        authLoadCheck    
    );

// Create username and password
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

// Reset password
authRouter
    .post("/resetpassword",
        body("oldPassword")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        body("newPassword")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authResetPassword
    );
 
// Delete account
authRouter
    .post("/deleteaccount",
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authDeleteAccount	
    );

// login to account
authRouter
    .post("/login",
        body("username")
            .trim()
            .notEmpty()
            .isLength({
                min: 4,
                max: 16
            }),
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        checkTokenPage,
        authLogin
    );

authRouter
    .post("/forgetpassword/check",
        body("username")
            .trim()
            .notEmpty()
            .isLength({
                min: 4,
                max: 16
            }),
        authForgetPasswordCheck
    );

authRouter
    .post("/forgetpassword/change",
        body("password")
            .trim()
            .notEmpty()
            .isLength({
                min: 4
            }),
        authForgetPasswordChange
    );

export default authRouter;
