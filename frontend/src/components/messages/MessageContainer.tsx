import { MessageCircle } from "lucide-react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Fragment } from "react";
import useConversation from "../../hooks/useConversations";
import useAuth from "../../hooks/useAuth";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <Fragment>
          <div className="bg-slate-500 bg-opacity-45 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </Fragment>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { getAuthUser } = useAuth();
  const { data: authUser } = getAuthUser;
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-base md:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome ${authUser?.fullName}`}</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
