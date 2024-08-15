import { create } from "zustand";

type Token = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

export const useToken = create<Token>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}));
