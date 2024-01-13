import React from "react";
import { Avatar as AAvatar } from "antd";
import styles from "./style.module.scss";

type PropsType = {
  src?: string;
  children?: React.ReactNode;
};

export const Avatar = ({ src, children }: PropsType) => {
  return src ? (
    <AAvatar src={src} size={64} className={styles.avatar__container} />
  ) : (
    <AAvatar size={64} className={styles.avatar__container}>
      {children}
    </AAvatar>
  );
};
