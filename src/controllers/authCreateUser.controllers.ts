import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { matchedData, validationResult,  } from "express-validator";

import { User, UserDocument } from "../models";
import { Env } from "../utils";

export interface DataRequest {
    username: string;
    password: string;
}

export default async function authCreateUser(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array()
        });
    }

    const dataRequest = matchedData(req) as DataRequest;

    if (!dataRequest) {
        return res.status(400).json({
            success: false,
            message: "Invalid or incomplete request data. Please provide valid data for user creation."
        });
    }

    try {
        const user: UserDocument = await User.create(dataRequest);

        const token = jwt.sign({ userId: user.id }, Env.JWT_AUTH_SECRET);
        res
            .status(201)
            .json({
                success: true,
                message: "User created successfully.",
                token
            });
    } catch (error: any) {
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
}