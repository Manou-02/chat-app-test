import React from "react";
import styles from "./style.module.scss";

type PropsType = {
  children: string | React.ReactNode;
};
export const CardItem = ({ children }: PropsType) => {
  return <div className={styles.cardItem__container}> {children} </div>;
};
