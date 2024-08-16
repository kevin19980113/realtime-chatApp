import useChatScroll from "../../hooks/useChatScroll";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  useListenMessages();

  const chatRef = useChatScroll(messages);

  return (
    <div className="px-4 flex-1 overflow-auto" ref={chatRef}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-md loading-spinner" />
        </div>
      ) : (
        messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
    </div>
  );
};
export default Messages;
