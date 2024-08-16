import { useEffect, useState } from "react";
import useConversation from "./useConversations";
import { toast } from "sonner";
import { useToken } from "./useToken";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { accessToken } = useToken();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return;

      setIsLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "An error occurred");

        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, isLoading };
};
export default useGetMessages;
