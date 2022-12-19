import styles from "./Footer.module.scss";
import React from "react";
import Image from "next/image";
import { Button, Input } from "nmgix-components/src";
import { Icon } from "components/Icon/Icon";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <form className={styles.form}>
        <div className={styles.formHeader}>
          <h1>Обратная связь</h1>
          <span>напишите почту и выберите цель связи</span>
        </div>
        <div className={styles.formBody}>
          <div className={styles.formBodyOptions}>
            <span className={styles.formBodyNestedHeader}>Цель связи ● Средняя работа</span>
            <div className={styles.formBodyOptionsContent}>
              <Button
                border={true}
                onClick={() => {}}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                Небольшая работа, одностраничник
              </Button>
              <Button
                border={true}
                onClick={() => {}}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                Средняя работа, многостраничник
              </Button>
              <Button
                border={true}
                onClick={() => {}}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                Корпоративный сайт и пр.
              </Button>
              <Button
                border={true}
                onClick={() => {}}
                opacity={0.5}
                size={"m"}
                color={"background-default"}
                backgroundColor={"background-alter"}>
                Постоянная работа
              </Button>
            </div>
          </div>
          <div className={styles.formBodySeparator} />
          <div className={styles.formBodyRequisites}>
            <span className={styles.formBodyNestedHeader}>Почта</span>
            <div className={styles.formBodyRequisitesContent}>
              <div className={styles.formBodyRequisitesContentControls}>
                <Input placeholder='your-favorite@mail.domain' />
                <Button
                  icon={{ icon: "arrow-right-long" }}
                  border={true}
                  onClick={() => {}}
                  size={"m"}
                  backgroundColor={"background-alter"}
                  color={"background-default"}
                  opacity={0.5}>
                  <span>Отправить</span>
                  <Icon icon='arrow-right' width={18} height={15} />
                </Button>
              </div>
              <span>Если не ответил в течении 3дн, отправьте ещё раз</span>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.credentials}>
        <span>© 2020 - 2022</span>
        <Image src={"/icons/nmgix-logo.png"} width={37} height={22} draggable={false} alt={`nmgix's logo`} />
      </div>
    </footer>
  );
};

export default Footer;
