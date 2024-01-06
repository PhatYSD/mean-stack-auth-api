import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { Env } from "../utils";
import { User } from "../models";
import { CheckTokenPage }  from "../middlerwares";
import { DataRequest } from "./authCreateUser.controllers";

export default async function authLogin(req: CheckTokenPage, res: Response) {
    const errors = validationResult(req);
    const id = req.userId;
    
    if (id) {
        return res.status(200).json({
            success: true,
            message: "You are logged in successfully."
        });
    }

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array()
        });
    }

    const { username, password } = matchedData(req) as DataRequest;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Username not found. Please check your credentials or register."
            });
        }

        const result = await bcrypt.compare(password, user.password);

        if (!result) {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect."
            });
        }

        const token = jwt.sign({ userId: user.id }, Env.JWT_AUTH_SECRET);

        res.status(200).json({
            success: true,
            message: "You are logged in successfully.",
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error. Unable to create user."
        });
    }
}