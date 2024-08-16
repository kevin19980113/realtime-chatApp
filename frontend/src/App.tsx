import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Fragment, useEffect } from "react";
import { Toaster } from "sonner";
import useAuth, { REFRESH_THRESHOLD } from "./hooks/useAuth";
import { isRefreshTokenExpired } from "./utils/refreshAccessToken";
import NotFoundPage from "./pages/404page";

function App() {
  const { getAuthUser, logout } = useAuth();
  const { data: authUser, isError, isLoading } = getAuthUser;
  const { mutate: logoutMutate } = logout;

  useEffect(() => {
    const checkRefreshToken = async () => {
      if (authUser) {
        const isExpired = await isRefreshTokenExpired();
        if (isExpired) logoutMutate();
      }
    };
    const intervalId = setInterval(checkRefreshToken, REFRESH_THRESHOLD);

    return () => clearInterval(intervalId);
  }, [authUser, isRefreshTokenExpired]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center text-xl text-red-600">
          An Error occurred. Please Try Again.
        </p>
      </div>
    );

  return (
    <Fragment>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignUp />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
}

export default App;
