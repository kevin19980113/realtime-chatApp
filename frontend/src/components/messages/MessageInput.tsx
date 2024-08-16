import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendMessageSchema, sendMessageSchemaType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const { handleSubmit, register, reset } = useForm<sendMessageSchemaType>({
    resolver: zodResolver(sendMessageSchema),
  });
  const { sendMessage, isLoading } = useSendMessage();

  const handleSendMessage = async (sendMessageData: sendMessageSchemaType) => {
    sendMessage(sendMessageData.message);
    reset();
  };
  return (
    <form className="px-4 mb-3" onSubmit={handleSubmit(handleSendMessage)}>
      <div className="w-full relative">
        <input
          {...register("message")}
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {isLoading ? (
            <span className="loading loading-sm loading-spinner" />
          ) : (
            <Send className="size-4 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
