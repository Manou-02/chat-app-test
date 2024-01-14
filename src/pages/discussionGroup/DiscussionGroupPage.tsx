import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import { Avatar } from "@/shared/ui/avatar/Avatar";
import { MessageContainer } from "@/shared/ui/messageContainer/MessageContainer";
import { MessageInput } from "@/shared/ui/messageInput/MessageInput";
import { IoIosSend } from "react-icons/io";
import { GrGroup } from "react-icons/gr";

export const DiscussionGroupPage = () => {
  const { id } = useParams();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const objDiv = window.document.getElementById("message_container");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [id]);

  const handleChange = (e: any) => {
    setMessage((Object.values(e) as any)[0]);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(">>>>>\n", message);
  };

  return (
    <div className={styles.discussion_group__container}>
      <div className={styles.discussion_group__header}>
        <Avatar size={54}>
          {" "}
          <GrGroup />{" "}
        </Avatar>
        <div className={styles.discussion_group__header_content}>
          <p className={styles.discussion_group__header_title}>{id} </p>
          {/* <p className={styles.discussion_group__header_subtitle}>Developpeur </p> */}
        </div>
      </div>
      <div className={styles.discussion_group__content} id="message_container">
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>

        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
        <MessageContainer type="sender">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          mollitia illo ad sint, facilis cum praesentium odio cupiditate non
          exercitationem? Illum molestias architecto dolores optio odit, commodi
          animi vel aut.
        </MessageContainer>
        <MessageContainer type="receiver"> Bonjour {id}</MessageContainer>
      </div>
      <form
        className={styles.discussion_group__footer}
        onSubmit={handleSendMessage}
      >
        <MessageInput
          name="message"
          placeholder="Ecrivez ici..."
          onChange={handleChange}
        />
        <IoIosSend
          className={styles.discussion_group__send_icon}
          onClick={handleSendMessage}
        />
      </form>
    </div>
  );
};
