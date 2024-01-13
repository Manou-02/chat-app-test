import styles from "./style.module.scss";

export default function MainLayout({ children }: any) {
  return <div className={styles.layout__card}>{children}</div>;
}
