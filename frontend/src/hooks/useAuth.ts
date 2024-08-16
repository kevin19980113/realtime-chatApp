import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useToken } from "./useToken";
import { UserType } from "../types/UserType";
import { loginSchemaType, signupSchemaType } from "../lib/schema";
import { toast } from "sonner";
import { useCallback } from "react";
import {
  isAccessTokenExpired,
  refreshAccessToken,
} from "../utils/refreshAccessToken";

export const REFRESH_THRESHOLD = 5 * 1000;

type LoginMutationResultType = { fullName: string; accessToken: string };

const useAuth = (): {
  getAuthUser: UseQueryResult<UserType, Error>;
  login: UseMutationResult<LoginMutationResultType, Error, loginSchemaType>;
  logout: UseMutationResult<{ fullName: string }, Error, void>;
  signup: UseMutationResult<void, Error, signupSchemaType>;
} => {
  const { accessToken, setAccessToken } = useToken();
  const queryClient = useQueryClient();

  const setAccessTokenAsync = useCallback(
    (token: string): Promise<void> => {
      return new Promise((resolve) => {
        setAccessToken(token);
        setTimeout(() => resolve(), 0);
      });
    },
    [setAccessToken]
  );

  const getAuthUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      let latestAccessToken = accessToken;

      if (!latestAccessToken) {
        latestAccessToken = await refreshAccessToken();

        if (latestAccessToken === "") return null;

        await setAccessTokenAsync(latestAccessToken);
      } else if (isAccessTokenExpired(latestAccessToken)) {
        latestAccessToken = await refreshAccessToken();

        if (latestAccessToken === "") return null;

        await setAccessTokenAsync(latestAccessToken);
      }

      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${latestAccessToken}`,
        },
      });
      if (!res.ok) return null;

      const data = await res.json();

      return data;
    },
    refetchInterval: REFRESH_THRESHOLD,
    staleTime: REFRESH_THRESHOLD,
    retry: false,
  });

  const login = useMutation({
    mutationFn: async ({ username, password }: loginSchemaType) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error) as Error;

      return data;
    },
    onSuccess: async (data: LoginMutationResultType) => {
      await setAccessTokenAsync(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(`welcome, ${data.fullName}!`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 204) return null;

      if (!res.ok)
        throw new Error("Failed to logout Pleas try again.") as Error;

      const data = await res.json();

      return data;
    },
    onSuccess: async (data: { fullName: string }) => {
      await setAccessTokenAsync("");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      if (data) return toast.success(`Goodbye, ${data.fullName}!`);

      toast.info("Your session has been expired. Please login again.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const signup = useMutation({
    mutationFn: async ({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    }: signupSchemaType) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error) as Error;
    },
    onSuccess: () => {
      toast.success("Signup Successful!! Please Login.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { getAuthUser, login, logout, signup };
};

export default useAuth;
