import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "../../../database";
import { User } from "../../../models";
import { signToken } from "../../../utils";
import { isValidEmail } from "../../../utils";

type Data =
	| { message: string }
	| { token: string; user: { email: string; name: string; role: string } };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "POST":
			return registerUser(req, res);
		default:
			return res.status(400).json({ message: "bad request" });
	}
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		email = "",
		password = "",
		name = "",
	} = req.body as { email: string; password: string; name: string };

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: "La contraseña debe de contener más de 6 caracteres" });
	}

	if (name.length < 6) {
		return res
			.status(400)
			.json({ message: "La nombre debe ser  más de 2 caracteres" });
	}
	//TODO: validar email
	if (!isValidEmail(email)) {
		return res
			.status(400)
			.json({ message: "El correo no tiene el formato correcto" });
	}

	await db.connect();
	const user = await User.findOne({ email });

	if (user) {
		return res.status(400).json({ message: "No puedes usar ese correo" });
	}
	const newUser = new User({
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: "client",
		name,
	});

	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		return res.status(500).json({ message: "Revisar logs del serveridor" });
	}

	const { _id, role } = newUser;
	const token = signToken(_id, email);
	return res.status(200).json({ token, user: { email, role, name } });
}
