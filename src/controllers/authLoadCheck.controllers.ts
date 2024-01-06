import { Response } from "express";

import { CheckTokenPage } from "../middlerwares";

export default function authLoadCheck(req: CheckTokenPage, res: Response) {
    const user = req.userName;

    if (!user)
        return res.status(401).json({ success: false, message: "User not authenticated. Please provide a valid access token." });

    res
        .status(200)
        .json({
            success: true,
            message: `Welcome to API, ${user}`, username: user
        });
}