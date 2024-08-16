import { create } from "zustand";
import { ConversationType, MessageType } from "../types/ConversationType";

export type ConversationState = {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
};

type ConversationAction = {
  setSelectedConversation: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
};

const useConversation = create<ConversationState & ConversationAction>(
  (set) => ({
    selectedConversation: null,
    messages: [],
    setSelectedConversation: (conversation) =>
      set({ selectedConversation: conversation }),
    setMessages: (messages) => set({ messages }),
  })
);

export default useConversation;
