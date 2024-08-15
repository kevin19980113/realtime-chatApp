import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const { mutate: logoutMutate, isPending } = logout;
  const handleLogout = async () => {
    logoutMutate();
  };

  return (
    <button className="mt-auto" disabled={isPending}>
      <LogOut
        className="size-6 text-white cursor-pointer hover:text-blue-500"
        onClick={handleLogout}
      />
    </button>
  );
};
export default LogoutButton;
