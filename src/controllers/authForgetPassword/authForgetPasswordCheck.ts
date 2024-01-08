import { Response, Request } from "express";
import { matchedData, validationResult } from "express-validator";
import { User } from "../../models";
import { DataRequest } from "../authCreateUser.controllers";

export default async function authForgetPassword(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array()
        });
    }

    try {
        const { username } = matchedData(req) as DataRequest;
        const user = await User.findOne({ username }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Next.",
            userId: user.id
        });
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