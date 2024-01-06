"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authLoadCheck(req, res) {
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
exports.default = authLoadCheck;
