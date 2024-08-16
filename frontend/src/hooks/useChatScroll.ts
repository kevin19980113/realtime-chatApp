import { useEffect, useRef } from "react";
import { MessageType } from "../types/ConversationType";

const useChatScroll = (messages: MessageType[]) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatRef.current)
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, 100);
  }, [messages]);

  return chatRef;
};

export default useChatScroll;
