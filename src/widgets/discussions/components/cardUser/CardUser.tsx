import { Avatar } from "@/shared/ui/avatar/Avatar";
import { LuUser } from "react-icons/lu";
import { FC } from "react";
import styles from "./style.module.scss";

type PropsType = {
  id: string;
  name: string;
  subtitle?: string;
  image?: string;
  isActive?: boolean;
  onClick: (id: string) => void;
};

export const CardUser: FC<PropsType> = ({
  id,
  name,
  subtitle,
  image,
  isActive,
  onClick,
}) => {
  return (
    <div className={styles.card_user__container} onClick={() => onClick(id)}>
      {image ? (
        <Avatar src={image} />
      ) : (
        <Avatar>
          <div className={styles.card_user__images_container}>
            <LuUser className={styles.card_user__avatar} />
          </div>
        </Avatar>
      )}
      <div className={styles.card_user__content}>
        <p className={styles.card_user__name}> {name} </p>
        <p className={styles.card_user__subtitle}>{subtitle}</p>

        <div className={styles.card_user__status_container}>
          {isActive ? (
            <>
              <div className={styles.card_user__active}></div>
              <p className={styles.card_user__subtitle}>Active</p>
            </>
          ) : (
            <>
              <div className={styles.card_user__inactive}></div>
              <p className={styles.card_user__subtitle}>Inactive</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
