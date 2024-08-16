import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { toast } from "sonner";
import { ConversationType } from "../types/ConversationType";

export const useGetConversations = (): {
  getConversations: UseQueryResult<ConversationType[], Error>;
} => {
  const { accessToken } = useToken();

  const getConversations = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await fetch(`/api/messages/conversations`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        toast.error("Failed to fetch conversations. Please try again.");
        return null;
      }

      const data = await res.json();

      return data;
    },
  });

  return { getConversations };
};
