import { Fragment } from "react";

const Conversation = ({ conversation }: { conversation: any }) => {
  return (
    <Fragment>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="size-8 md:size-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="w-2/3 flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="w-5/6 font-bold text-gray-200 text-sm md:text-md truncate">
              {conversation.fullName}
            </p>
            <span className="text-xl hidden md:inline-block">
              {conversation.emoji}
            </span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </Fragment>
  );
};
export default Conversation;
