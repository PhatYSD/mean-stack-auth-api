import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import { Env } from "../utils";
import { User } from "../models";

export interface CheckTokenPage extends Request {
    userName?: string;
    userId?: string;
}

interface Result {
    userId: string;
}

export default async function checkTokenPage(req: CheckTokenPage, res: Response, next: NextFunction) {
    const token = req.header("access-token") as string;

    if (!token) {
        return res
            .status(403)
            .json({
                success: false,
                message: "Access token is missing in the request headers. Please provide a valid access token."
            });
    }

    try {
        const result = jwt.verify(token, Env.JWT_AUTH_SECRET) as Result;

        if (!("userId" in result)) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: "Decode error: Missing 'userId' in the decoded token."
                });
        }
            
        const user = await User.findById(result.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        req.userName = user.username;
        req.userId = user.id;

        next();
    } catch (error) {
        console.log("An error occurred:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error."
            });
    }
}