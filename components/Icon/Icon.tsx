import React from "react";
import styles from "./Icon.module.scss";

enum AvailableIcons {
  "arrow-left",
  "arrow-right",
  "gear",
  "link-arrow",
  "star",
}

type IconProps = {
  icon: keyof typeof AvailableIcons;
  width: number;
  height: number;
};

export const Icon: React.FC<IconProps> = ({ icon, width, height }) => {
  return (
    <i
      className={styles.icon}
      style={{ width, height, WebkitMask: `url(/icons/${icon}.svg)  no-repeat 50% 50%`, WebkitMaskSize: "contain" }}
    />
  );
};
