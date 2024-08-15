import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const logout = () => {
    alert("You are logged out");
  };

  return (
    <div className="mt-auto">
      <LogOut
        className="size-6 text-white cursor-pointer hover:text-blue-500"
        onClick={logout}
      />
    </div>
  );
};
export default LogoutButton;
