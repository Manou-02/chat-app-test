import { useParams } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import styles from "./style.module.scss";
import { MessageInput } from "@/shared/ui/messageInput/MessageInput";
import { useEffect, useState } from "react";
import { MessageContainer } from "@/shared/ui/messageContainer/MessageContainer";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { LuUser } from "react-icons/lu";
import { Loader } from "@/shared/ui/loader/Loader";
import { MessagesServices } from "@/features/messages/services/MessagesServices";
import { HttpStatus } from "@/shared/config/Status";
import { useSelector } from "react-redux";
import { RootState } from "@/app/appStore";
import Spinner from "@/shared/ui/spinner/Spinner";

export const DiscussionPage = () => {
  const { id } = useParams();

  const user = useSelector((state: RootState) => state.profileUser)?.user;

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [allConversations, setAllConversations] = useState<any[]>([]);
  const [isLoadingMessage, setIsloadingMessage] = useState<boolean>(false);

  useEffect(() => {
    const objDiv = window.document.getElementById("message_container");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    id && getMessagesConversations(id);
  }, [id]);

  const getMessagesConversations = async (id: string, isLoad = true) => {
    try {
      setIsloading(isLoad ? true : false);
      const { status, data } = await MessagesServices.getMessagesDiscussions(
        id
      );
      if (status === HttpStatus.OK) {
        setAllConversations(data?.data);
        console.log(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleChange = (e: any) => {
    setMessage((Object.values(e) as any)[0]);
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    const dataToSend = {
      chatId: id,
      senderId: user?._id,
      text: message,
    };
    try {
      setIsloadingMessage(true);
      const { status } = await MessagesServices.sendMessages(dataToSend);
      if (status === HttpStatus.OK) {
        setMessage("");
        id && getMessagesConversations(id, false);
      }
    } catch (error) {
    } finally {
      setIsloadingMessage(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={styles.discussion__container}>
        <div className={styles.discussion__header}>
          <Avatar size={54}>
            {" "}
            <LuUser />{" "}
          </Avatar>
          <div className={styles.discussion__header_content}>
            <p className={styles.discussion__header_title}>Johm Doe </p>
            <p className={styles.discussion__header_subtitle}>Developpeur </p>
          </div>
        </div>
        <div className={styles.discussion__content} id="message_container">
          {allConversations?.map((item: any, key: number) => (
            <MessageContainer
              type={user?._id === item?.senderId?._id ? "sender" : "receiver"}
              key={key}
            >
              {" "}
              {item?.text}
            </MessageContainer>
          ))}
        </div>
        <form
          className={styles.discussion__footer}
          onSubmit={handleSendMessage}
        >
          <MessageInput
            value={message}
            name="message"
            placeholder="Ecrivez ici..."
            onChange={handleChange}
          />
          {isLoadingMessage ? (
            <Spinner />
          ) : (
            <IoIosSend
              className={styles.discussion__send_icon}
              onClick={handleSendMessage}
            />
          )}
        </form>
      </div>
    </>
  );
};
