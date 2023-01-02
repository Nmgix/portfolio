import "nmgix-components/src/index.scss";
import "../styles/globals.scss";
import styles from "../styles/pages/_app/_app.module.scss";

import type { AppProps } from "next/app";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { useRouter } from "next/router";

import { IntlProvider } from "react-intl";
import ru from "../lang/ru.json";
import en from "../lang/en.json";
import { Messages } from "types/Localization";
import AppController from "components/AppController/App.Controller";
import dynamic from "next/dynamic";
import Head from "next/head";

const Background = dynamic(() => import("../components/Background/Background"), {
  ssr: false,
});

const messages: Messages = {
  ru,
  en,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale!} messages={messages[locale as keyof Messages]}>
      <Head>
        <meta name='viewport' content='width=device-width, minimum-scale=1'></meta>
        <meta property='og:title' content={locale === "en" ? "NMGIX's portfolio" : "Портфолио NMGIX"} />
        <meta
          property='og:image'
          content={"https://raw.githubusercontent.com/nmgix/portfolio/main/public/images/github-preview.png"}
        />
        <meta property='og:type' content='article' />
      </Head>
      <Background />
      <AppController>
        <Header />
        <div className={styles.mainContent}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </AppController>
    </IntlProvider>
  );
}

export default MyApp;
