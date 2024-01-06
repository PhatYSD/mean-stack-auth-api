"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const bcrypt = __importStar(require("bcrypt"));
const express_validator_1 = require("express-validator");
function authResetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.userId;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!id) {
            return res
                .status(404)
                .json({
                success: false,
                message: "User or id not found."
            });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array()
            });
        }
        const { oldPassword, newPassword } = (0, express_validator_1.matchedData)(req);
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid or incomplete request data. Please provide valid data for user creation."
            });
        }
        try {
            const user = yield models_1.User.findById(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }
            const result = yield bcrypt
                .compare(oldPassword, user.password);
            if (!result) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid credentials. Password does not match."
                });
            }
            user.password = newPassword;
            yield user.save();
            res.status(200).json({
                success: true,
                message: "Successfully reset password."
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
exports.default = authResetPassword;
