import "../styles/globals.scss";
import "nmgix-components/src/index.scss";
import styles from "../styles/pages/_app/_app.module.scss";

import type { AppProps } from "next/app";
import { AppThemeContainer } from "nmgix-components/src";
import React from "react";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import ru from "../lang/ru.json";
import en from "../lang/en.json";

type Messages = {
  ru: { [x: string]: string };
  en: { [x: string]: string };
};

const messages: Messages = {
  ru,
  en,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale!} messages={messages[locale as keyof Messages]}>
      <AppThemeContainer loaded noButton>
        <Header />
        <div className={styles.mainContent}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </AppThemeContainer>
    </IntlProvider>
  );
}

export default MyApp;
