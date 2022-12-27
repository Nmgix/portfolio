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

const messages: Messages = {
  ru,
  en,
};

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale!} messages={messages[locale as keyof Messages]}>
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
