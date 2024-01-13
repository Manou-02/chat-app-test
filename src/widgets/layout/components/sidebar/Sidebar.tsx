import { FC } from "react";
import { IMAGES } from "@/shared/config/Images";
import styles from "./style.module.scss";
import { DiscussionSideBar } from "./DiscussionSideBar";
// import { PiUsersThreeBold } from "react-icons/pi";
// import { FaChalkboardUser } from "react-icons/fa6";
// import { RiMapPinLine } from "react-icons/ri";

export const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__title_icon}>
        <img
          src={IMAGES.CHAT}
          alt="Logo images"
          className={styles.sidebar__images}
        />
      </div>
      <div className={styles.sidebar__content}>
        <DiscussionSideBar />
      </div>
    </div>
  );
};
