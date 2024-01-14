import { useParams } from "react-router-dom";

export const DiscussionGroupPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>DiscussionGroup - {id}</p>
    </div>
  );
};
