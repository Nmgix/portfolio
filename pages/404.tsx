import Link from "next/link";
import { Button } from "nmgix-components/src";
import React from "react";
import styles from "../styles/pages/404.module.scss";

const PageNotExsists: React.FC = () => {
  return (
    <div className={styles.page404}>
      <h3>Страница не найдена</h3>
      <span>Проверьте ссылку, возможно там лишние символы</span>
      <Button border={false} onClick={() => {}} size='m' backgroundColor='background-alter' color='background-default'>
        <Link href={"/"}>Вернуться на главную</Link>
      </Button>
    </div>
  );
};

export default PageNotExsists;
