import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Product } from "../../../models";
import { IProduct } from "../../../interfaces";

type Data = { message: string } | IProduct;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case "GET":
			return getProductsBySlug(req, res);

		default:
			return res.status(400).json({ message: "bad request" });
	}
}
async function getProductsBySlug(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { slug } = req.query;
	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	if (!product) {
		return res.status(404).json({ message: "Producto no encontrado" });
	}

	return res.status(200).json(product);
}
