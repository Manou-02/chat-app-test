import { useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import styles from "./style.module.scss";
import { MessageInput } from "@/shared/ui/messageInput/MessageInput";

export const DiscussionPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.discussion__container}>
      <div className={styles.discussion__content}></div>
      <div className={styles.discussion__footer}>
        <MessageInput placeholder="Ecrivez ici..." />
        <IoIosSend className={styles.discussion__send_icon} />
      </div>
    </div>
  );
};
