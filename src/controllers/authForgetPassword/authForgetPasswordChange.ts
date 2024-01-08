import { Response, Request } from "express";
import { matchedData, validationResult } from "express-validator";
import { DataRequest } from "../authCreateUser.controllers";
import { User } from "../../models";

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
        const { password } = matchedData(req) as DataRequest;
        const userId = req.header("access-userid") as string;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.password = password;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Success to change password."
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