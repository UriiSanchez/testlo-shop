import { SWRConfig } from "swr";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { lightTheme } from "../themes";
import { UIProvider, AuthProvider } from "../context";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider >
			<SWRConfig
				value={{
					fetcher: (resource, init) =>
						fetch(resource, init).then((res) => res.json()),
				}}
			>
				<AuthProvider>
					<UIProvider>
						<ThemeProvider theme={lightTheme}>
							<CssBaseline />
							<Component {...pageProps} />
						</ThemeProvider>
					</UIProvider>
				</AuthProvider>
			</SWRConfig>
		</SessionProvider>
	);
}
