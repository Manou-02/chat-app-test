import styles from "./style.module.scss";

type CardProps = {
  children: string | React.ReactNode;
  //   width: string | number;
  //   height: string | number;
};

export const MinCard = ({ children }: CardProps) => {
  return <div className={styles.card__container}>{children}</div>;
};
