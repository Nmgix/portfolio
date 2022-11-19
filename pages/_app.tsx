import "../styles/globals.scss";
import "nmgix-components/src/index.scss";
import type { AppProps } from "next/app";
import { AppContainer } from "nmgix-components/src";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContainer loaded>
      <Component {...pageProps} />
    </AppContainer>
  );
}

export default MyApp;
