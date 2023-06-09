import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUser } from "@/database";

export default NextAuth({
	providers: [
		Credentials({
			name: "Custom Login",
			credentials: {
				email: {
					label: "Correo",
					type: "email",
					placeholder: "correo@google.com",
				},
				password: {
					label: "Contraseña",
					type: "password",
					placeholder: "Contraseña",
				},
			},
			async authorize(credentials) {
				return await dbUser.checkUserEmailPassword(
					credentials!.email,
					credentials!.password
				);
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
	],
	//Callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				switch (account.type) {
					case "credentials":
						token.user = user;
						break;
					case "oauth":
						break;
					default:
						break;
				}
			}
			return token;
		},
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;
			return session;
		},
	},
});
