import "../styles/globals.scss";
import "../styles/pages/_app.module.scss";
import "nmgix-components/src/index.scss";
import type { AppProps } from "next/app";
import { AppThemeContainer } from "nmgix-components/src";
import React from "react";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppThemeContainer loaded noButton>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AppThemeContainer>
  );
}

export default MyApp;
