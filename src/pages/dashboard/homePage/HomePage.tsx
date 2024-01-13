import { IMAGES } from "@/shared/config/Images";
import styles from "./style.module.scss";
import { MinCard } from "@/shared/ui/minCard/MinCard";
import { MdOutlineAddComment } from "react-icons/md";
import { BiSolidMessageAdd } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export const HomePage = () => {
  return (
    <>
      <div className={styles.home_page__header}>
        <img
          src={IMAGES.CONVERSATIONS}
          alt="converations"
          className={styles.home_page__header_image}
        />
        <p className={styles.home_page__title}>Chat App</p>
      </div>
      <div className={styles.home_page__content}>
        <MinCard>
          <div className={styles.home_page__card_content}>
            <MdOutlineAddComment
              className={styles.home_page__card_content_icon}
            />{" "}
            <p className={styles.home_page__card_content_title}>
              Créer une discussion
            </p>
          </div>
        </MinCard>

        <MinCard>
          <div className={styles.home_page__card_content}>
            <AiOutlineUsergroupAdd
              className={styles.home_page__card_content_icon}
            />
            <p className={styles.home_page__card_content_title}>
              Créer un groupe de discussion
            </p>
          </div>
        </MinCard>
      </div>
    </>
  );
};
