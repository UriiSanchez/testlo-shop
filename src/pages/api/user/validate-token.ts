import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../database";
import { User } from "../../../models";
import { isValidToken, signToken } from "../../../utils";

type Data =
	| { message: string }
	| { token: string; user: { email: string; name: string; role: string } };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return checkJWT(req, res);
		default:
			return res.status(400).json({ message: "bad request" });
	}
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { token = "" } = req.cookies;
	let userId = "";
	try {
		userId = await isValidToken(token);
	} catch (error) {
		return res.status(401).json({ message: "Token no válido" });
	}
	await db.connect();
	const user = await User.findById(userId).lean();
	await db.disconnect();

	if (!user) {
		return res.status(400).json({ message: "No existe usuario con ese id" });
	}

	const { role, name, _id, email } = user;

	return res
		.status(200)
		.json({ token: signToken(_id, email), user: { email, role, name } });
}
