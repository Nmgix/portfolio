import Link from "next/link";
import { Button } from "nmgix-components/src";
import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "../styles/pages/404.module.scss";

const PageNotExsists: React.FC = () => {
  return (
    <div className={styles.page404}>
      <h3>
        <FormattedMessage id='page.404.title' />
      </h3>
      <span>
        <FormattedMessage id='page.404.subtitle' />
      </span>
      <Button
        buttonBorder={false}
        onClick={() => {}}
        size='m'
        backgroundColor='background-alter'
        color='background-default'>
        <Link href={"/"}>
          <FormattedMessage id='page.404.button' />
        </Link>
      </Button>
    </div>
  );
};

export default PageNotExsists;
