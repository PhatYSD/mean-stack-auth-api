import { User } from "../models";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { CheckTokenPage } from "../middlerwares";

interface DataRequest {
    oldPassword: string;
    newPassword: string;
}

export default async function authResetPassword(req: CheckTokenPage, res: Response) {
    const id = req.userId;
    const errors = validationResult(req);

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

    const { oldPassword, newPassword } = matchedData(req) as DataRequest;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid or incomplete request data. Please provide valid data for user creation."
        });
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const result = await bcrypt
            .compare(oldPassword, user.password);

        if (!result) {
            return res.status(403).json({
                success: false,
                message: "Invalid credentials. Password does not match."
            });
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Successfully reset password."
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