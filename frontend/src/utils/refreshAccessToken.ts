import { jwtDecode } from "jwt-decode";
import { REFRESH_THRESHOLD } from "../hooks/useAuth";

export const refreshAccessToken = async (): Promise<string> => {
  const res = await fetch("/api/auth/refresh", {
    credentials: "include",
  });

  if (!res.ok) return "";

  const data = await res.json();

  return data.accessToken;
};

export const isAccessTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  if (!decoded || typeof decoded.exp !== "number") return token;

  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();

  if (expirationTime - currentTime < REFRESH_THRESHOLD) return true;

  return false;
};

export const isRefreshTokenExpired = async (): Promise<boolean> => {
  const res = await fetch("/api/auth/refresh", {
    credentials: "include",
  });

  const data = await res.json();

  if (data.error === "NO JWT TOKEN") return true;

  return false;
};
