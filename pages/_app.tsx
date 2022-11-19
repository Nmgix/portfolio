import "../styles/globals.scss";
import "nmgix-components/src/index.scss";
import type { AppProps } from "next/app";
import { AppThemeContainer } from "nmgix-components/src";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeContainer loaded noSwitch>
      <Component {...pageProps} />
    </AppThemeContainer>
  );
}

export default MyApp;
