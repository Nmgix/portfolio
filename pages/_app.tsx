import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AppContainer } from "nmgix-components/src";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer loaded>
      <Component {...pageProps} />;
    </AppContainer>
  );
}

export default MyApp;
