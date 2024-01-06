"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlerwares_1 = require("../middlerwares");
const authRouter = (0, express_1.Router)();
authRouter
    .get("/", middlerwares_1.checkTokenPage, controllers_1.authLoadCheck);
authRouter
    .post("/", (0, express_validator_1.body)("username")
    .trim()
    .notEmpty()
    .isLength({
    max: 16,
    min: 4
}), (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .isLength({
    min: 4
}), controllers_1.authCreateUser);
authRouter
    .post("/resetpassword", (0, express_validator_1.body)("oldPassword")
    .trim()
    .notEmpty()
    .isLength({
    min: 4
}), (0, express_validator_1.body)("newPassword")
    .trim()
    .notEmpty()
    .isLength({
    min: 4
}), middlerwares_1.checkTokenPage, controllers_1.authResetPassword);
authRouter
    .post("/deleteaccount", (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .isLength({
    min: 4
}), middlerwares_1.checkTokenPage, controllers_1.authDeleteAccount);
authRouter
    .post("/login", (0, express_validator_1.body)("username")
    .trim()
    .notEmpty()
    .isLength({
    min: 4,
    max: 16
}), (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .isLength({
    min: 4
}), middlerwares_1.checkTokenPage, controllers_1.authLogin);
exports.default = authRouter;
