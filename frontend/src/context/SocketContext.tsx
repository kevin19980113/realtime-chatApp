import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";
import io, { Socket } from "socket.io-client";
import useAuth from "../hooks/useAuth";

// socket - socket of current logged in user (authenticated user)
// onlineUsers - list of online users
type IoSocketContext = {
  socket: Socket | null;
  onlineUsers: string[];
};

const SocketContext = createContext<IoSocketContext | undefined>(undefined);

const socketURL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

// store socket of current logged in user (authenticated user) and online users list
const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { getAuthUser } = useAuth();
  const { data: authUser, isLoading } = getAuthUser;

  useEffect(() => {
    if (authUser && !isLoading) {
      const socket = io(socketURL, {
        query: {
          userId: authUser.id,
        },
      });
      socketRef.current = socket;

      socket.on("getOnlineUsers", (usersId: string[]) => {
        setOnlineUsers(usersId);
      });

      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!authUser && !isLoading) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [authUser, isLoading]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): IoSocketContext => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export default SocketContextProvider;
