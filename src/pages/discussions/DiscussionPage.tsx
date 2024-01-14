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

export const DiscussionPage = () => {
  const { id } = useParams();

  const user = useSelector((state: RootState) => state.profileUser)?.user;

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [allConversations, setAllConversations] = useState<any[]>([]);

  useEffect(() => {
    const objDiv = window.document.getElementById("message_container");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    id && getMessagesConversations(id);
  }, [id]);

  const getMessagesConversations = async (id: string) => {
    try {
      setIsloading(true);
      const { status, data } = await MessagesServices.getMessagesDiscussions(
        id
      );
      if (status === HttpStatus.OK) {
        setAllConversations(data?.data);
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

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(">>>>>\n", message);
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
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>

          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
          <MessageContainer type="sender">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            mollitia illo ad sint, facilis cum praesentium odio cupiditate non
            exercitationem? Illum molestias architecto dolores optio odit,
            commodi animi vel aut.
          </MessageContainer>
          <MessageContainer type="receiver"> Bonjour</MessageContainer>
        </div>
        <form
          className={styles.discussion__footer}
          onSubmit={handleSendMessage}
        >
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
    </>
  );
};
