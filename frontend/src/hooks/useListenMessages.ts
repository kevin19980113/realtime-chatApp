import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "./useConversations";
import { MessageType } from "../types/ConversationType";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      if (newMessage.senderId === selectedConversation?.id) {
        newMessage.isNew = true;
        setMessages([...messages, newMessage]);
      }
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
