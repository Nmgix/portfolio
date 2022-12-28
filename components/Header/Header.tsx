import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { Button, TransitionStyles } from "nmgix-components/src";
import { useEffect, useState } from "react";

import { FormattedMessage } from "react-intl";
import { Transition } from "react-transition-group";
import styles from "./Header.module.scss";

const ActiveLangButton: React.FC<{ children: React.ReactNode; locale: "ru" | "en"; router: NextRouter }> = ({
  children,
  locale,
  router,
}) => {
  return router.locale === locale ? (
    <div style={{ opacity: 0.5 }}>{children}</div>
  ) : (
    <Button buttonBorder={false} onClick={() => router.push(router.asPath, undefined, { locale })} size='s'>
      {children}
    </Button>
  );
};

const Header: React.FC = () => {
  const router = useRouter();

  const [rendered, setRendered] = useState<boolean>(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  const transitionStyles: TransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
  };

  return (
    <Transition timeout={100} in={rendered}>
      {(state) =>
        rendered && (
          <header className={styles.header} style={{ ...transitionStyles[state as keyof TransitionStyles] }}>
            <Head>
              <title>NMGIX</title>
            </Head>
            <div className={styles.hero}>
              <Link href={"/"}>
                <h3>NMGIX</h3>
              </Link>
              <div className={styles.controls}>
                <span>
                  <FormattedMessage id='header.subtitle' />
                </span>
                <ActiveLangButton locale='ru' router={router}>
                  <Image
                    src={"/icons/russian-flag.svg"}
                    width={27}
                    height={15}
                    alt={"Russian flag icon to navigate to russian translate page"}
                    draggable={false}
                  />
                </ActiveLangButton>
                <ActiveLangButton locale='en' router={router}>
                  <Image
                    src={"/icons/american-flag.svg"}
                    width={27}
                    height={15}
                    alt={"American flag icon to navigate to american translate page"}
                    draggable={false}
                  />
                </ActiveLangButton>
              </div>
            </div>
            <div className={styles.settings}>
              {/* <Button border={false} onClick={() => {}} size='s'>
          <Icon icon='gear' width={30} height={30} />
        </Button> */}
            </div>
          </header>
        )
      }
    </Transition>
  );
};

export default Header;
