"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const models_1 = require("../models");
function checkTokenPage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header("access-token");
        if (!token && req.path === "/login") {
            return next();
        }
        if (!token) {
            return res
                .status(403)
                .json({
                success: false,
                message: "Access token is missing in the request headers. Please provide a valid access token."
            });
        }
        try {
            const result = jsonwebtoken_1.default.verify(token, utils_1.Env.JWT_AUTH_SECRET);
            if (!("userId" in result)) {
                return res
                    .status(401)
                    .json({
                    success: false,
                    message: "Decode error: Missing 'userId' in the decoded token."
                });
            }
            const user = yield models_1.User.findById(result.userId).select("-password");
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }
            req.userName = user.username;
            req.userId = user.id;
            next();
        }
        catch (error) {
            console.log("An error occurred:", error);
            return res
                .status(500)
                .json({
                success: false,
                message: "Internal server error."
            });
        }
    });
}
exports.default = checkTokenPage;
