import React, { FC } from "react";
import styles from "./style.module.scss";
import { Avatar } from "@/shared/ui/avatar/Avatar";

import { LuUser } from "react-icons/lu";

type PropsType = {
  children: React.ReactNode;
  type: "sender" | "receiver";
};

export const MessageContainer: FC<PropsType> = ({
  type = "sender",
  children,
}) => {
  return type === "receiver" ? (
    <div className={styles.message_container__cont}>
      <Avatar size={40}>
        {" "}
        <LuUser />{" "}
      </Avatar>
      <div className={styles.message_container__container_receiver}>
        <div className={styles.message_container__content_receiver}>
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.message_container__container_sender}>
      <div className={styles.message_container__content_sender}>{children}</div>
    </div>
  );
};
