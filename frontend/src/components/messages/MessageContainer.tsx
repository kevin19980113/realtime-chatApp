import { MessageCircle } from "lucide-react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Fragment } from "react";

const MessageContainer = () => {
  return (
    <div className="w-full flex flex-col">
      <Fragment>
        <div className="bg-slate-500 bg-opacity-45 px-4 py-2 mb-2">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">John doe</span>
        </div>

        <Messages />
        <MessageInput />
        {/* <NoChatSelected /> */}
      </Fragment>
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-base md:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 John Doe ❄</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className="text-xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
