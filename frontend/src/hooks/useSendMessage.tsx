import { useState } from "react";
import useConversation from "./useConversations";
import { toast } from "sonner";
import { useToken } from "./useToken";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { accessToken } = useToken();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};
export default useSendMessage;
