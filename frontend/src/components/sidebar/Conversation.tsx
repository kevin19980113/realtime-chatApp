import { Fragment } from "react";
import { ConversationType } from "../../types/ConversationType";
import useConversation from "../../hooks/useConversations";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation }: { conversation: ConversationType }) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = conversation.id === selectedConversation?.id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <Fragment>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="size-8 md:size-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="w-2/3 flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="w-full font-bold text-gray-200 text-sm md:text-md truncate">
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </Fragment>
  );
};
export default Conversation;
