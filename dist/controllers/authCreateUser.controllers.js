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
const express_validator_1 = require("express-validator");
const models_1 = require("../models");
const utils_1 = require("../utils");
function authCreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array()
            });
        }
        const dataRequest = (0, express_validator_1.matchedData)(req);
        if (!dataRequest) {
            return res.status(400).json({
                success: false,
                message: "Invalid or incomplete request data. Please provide valid data for user creation."
            });
        }
        try {
            const user = yield models_1.User.create(dataRequest);
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.Env.JWT_AUTH_SECRET);
            res
                .status(201)
                .json({
                success: true,
                message: "User created successfully.",
                token
            });
        }
        catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Username is already taken. Please choose a different username."
                });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error. Unable to create user."
            });
        }
    });
}
exports.default = authCreateUser;
