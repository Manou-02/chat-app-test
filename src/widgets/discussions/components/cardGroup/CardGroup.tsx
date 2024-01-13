import { Avatar } from "@/shared/ui/avatar/Avatar";
import { FC } from "react";
import styles from "./style.module.scss";
import { GrGroup } from "react-icons/gr";

type PropsType = {
  name: string;
  subtitle?: string;
  image?: string;
};

export const CardGroup: FC<PropsType> = ({ name, image, subtitle }) => {
  return (
    <div className={styles.card_group__container}>
      {image ? (
        <Avatar src={image} />
      ) : (
        <Avatar>
          <div className={styles.card_group__images_container}>
            <GrGroup className={styles.card_user__avatar} />
          </div>
        </Avatar>
      )}
      <div className={styles.card_group__content}>
        <p className={styles.card_group__name}> {name} </p>
        <p className={styles.card_group__subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};
