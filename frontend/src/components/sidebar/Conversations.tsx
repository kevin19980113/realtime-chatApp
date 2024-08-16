import { useGetConversations } from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { getConversations } = useGetConversations();
  const { data: conversations, isLoading } = getConversations;

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {isLoading ? (
        <span className="loading loading-md loading-spinner mx-auto" />
      ) : (
        conversations?.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))
      )}
    </div>
  );
};
export default Conversations;
