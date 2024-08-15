import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
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
