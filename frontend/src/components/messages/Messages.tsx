import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, isLoading } = useGetMessages();

  return (
    <div className="px-4 flex-1 overflow-auto">
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
