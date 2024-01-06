import { matchedData, validationResult } from "express-validator";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { User } from "../models";

import { CheckTokenPage } from "../middlerwares";

export default async function authDeleteAccount(req: CheckTokenPage, res: Response) {
	const id = req.userId;
	const errors = validationResult(req);

	if (!id) {
		return res.status(404).json({
			success: false,
			message: "Not found user id"
		});
	}

	if (!errors.isEmpty()) {
		return res.status(400).json({
            success: false,
            message: "Validation failed.",
            errors: errors.array()
        });
	}

	const { password } = matchedData(req) as { password: string };

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "Not found this user by the id."
			})
		};

		const result = await bcrypt.compare(password, user.password);

		if (!result) {
			return res.status(403).json({
                success: false,
                message: "Invalid credentials. Password does not match."
            });
		}

		await user.deleteOne();

		res.sendStatus(204);
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Inernal server error. Unable to delete account."
		});
	}
}    
