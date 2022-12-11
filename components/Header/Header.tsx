import Image from "next/image";
import { Button } from "nmgix-components/src";
import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <h3>NMGIX</h3>
        <div className={styles.controls}>
          <span>с 2020г</span>
          <Button border={false} onClick={() => {}} size='s'>
            <Image
              src={"/icons/russian-flag.svg"}
              width={27}
              height={15}
              alt={"Russian flag icon to navigate to russian translate page"}
              draggable={false}
            />
          </Button>
          <Button border={false} onClick={() => {}} size='s'>
            <Image
              src={"/icons/american-flag.svg"}
              width={27}
              height={15}
              alt={"American flag icon to navigate to american translate page"}
              draggable={false}
            />
          </Button>
        </div>
      </div>
      <div className={styles.settings}>
        <Button border={false} onClick={() => {}} size='s'>
          <Image src={"/icons/gear.svg"} width={30} height={30} draggable={false} alt='Settings icon' />
        </Button>
      </div>
    </header>
  );
};

export default Header;
