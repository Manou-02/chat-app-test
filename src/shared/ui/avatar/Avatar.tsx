import React from "react";
import { Avatar as AAvatar } from "antd";
import styles from "./style.module.scss";

type PropsType = {
  size?: number;
  src?: string;
  children?: React.ReactNode;
};

export const Avatar = ({ size = 64, src, children }: PropsType) => {
  return src ? (
    <AAvatar src={src} size={size} className={styles.avatar__container} />
  ) : (
    <AAvatar size={size} className={styles.avatar__container}>
      {children}
    </AAvatar>
  );
};
