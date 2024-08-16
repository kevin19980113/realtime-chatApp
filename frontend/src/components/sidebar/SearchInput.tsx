import { Search } from "lucide-react";
import { useGetConversations } from "../../hooks/useGetConversation";
import useConversation from "../../hooks/useConversations";
import { useState } from "react";
import { toast } from "sonner";
import { ConversationType } from "../../types/ConversationType";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { getConversations } = useGetConversations();
  const { data: conversations } = getConversations;
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      return toast.info("Search term must be at least 3 characters long");
    }

    const searchedConversation = conversations?.find(
      (conversation: ConversationType) =>
        conversation.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (searchedConversation) {
      setSelectedConversation(searchedConversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search…"
        className="input-xs md:input-sm input-bordered rounded-full sm:rounded-full w-full"
      />
      <button
        type="submit"
        className="btn md:btn-sm btn-xs btn-circle bg-sky-500 text-white  "
      >
        <Search className="size-3 md:size-5 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
