import { FC, useEffect, useReducer } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";

export interface AuthState {
	isLoggedIn: boolean;
	user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
	isLoggedIn: false,
	user: undefined,
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
	const { data, status } = useSession();
	const router = useRouter();
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

	useEffect(() => {
		if (status === "authenticated") {
			dispatch({ type: "[ Auth ] - Login", payload: data?.user as IUser });
		}
	}, [status, data]);

	// useEffect(() => {
	// 	checkToken();
	// }, []);

	const checkToken = async () => {
		if (!Cookies.get("token")) {
			return;
		}

		try {
			const { data } = await tesloApi.get("/user/validate-token");
			const { token, user } = data;
			Cookies.set("token", token);
			dispatch({ type: "[ Auth ] - Login", payload: user });
			return true;
		} catch (error) {
			Cookies.remove("token");
		}
	};

	const loginUser = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const { data } = await tesloApi.post("/user/login", { email, password });
			const { token, user } = data;
			Cookies.set("token", token);
			dispatch({ type: "[ Auth ] - Login", payload: user });
			return true;
		} catch (error) {
			return false;
		}
	};

	const logout = () => {
		Cookies.remove("cart");

		Cookies.remove("firstName");
		Cookies.remove("lastName");
		Cookies.remove("address");
		Cookies.remove("address2");
		Cookies.remove("zip");
		Cookies.remove("city");
		Cookies.remove("country");
		Cookies.remove("phone");
		signOut();
		// Cookies.remove("token");
		// router.reload();
	};

	return (
		<AuthContext.Provider value={{ ...state, loginUser, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
