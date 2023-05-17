import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { isValidToken } from "../../utils";

export async function middleware(req: NextRequest, env: NextFetchEvent) {
	const { token = "" } = req.cookies;
	try {
		await isValidToken(token);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(`/auth/login?p=${req.page.name}`);
	}
}
