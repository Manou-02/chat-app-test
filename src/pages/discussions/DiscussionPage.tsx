import { useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import styles from "./style.module.scss";
import { MessageInput } from "@/shared/ui/messageInput/MessageInput";
import { useState } from "react";

export const DiscussionPage = () => {
  const { id } = useParams();

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: any) => {
    setMessage((Object.values(e) as any)[0]);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(">>>>>\n", message);
  };

  return (
    <div className={styles.discussion__container}>
      <div className={styles.discussion__content}>
        <p className="h-[40px] bg-red-400 my-[20px]">zazaz</p>
        <p className="h-[40px] bg-red-400 my-[20px]">zazaz</p>
      </div>
      <form className={styles.discussion__footer} onSubmit={handleSendMessage}>
        <MessageInput
          name="message"
          placeholder="Ecrivez ici..."
          onChange={handleChange}
        />
        <IoIosSend
          className={styles.discussion__send_icon}
          onClick={handleSendMessage}
        />
      </form>
    </div>
  );
};
