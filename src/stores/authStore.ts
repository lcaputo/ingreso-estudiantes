import { create } from "zustand";
import { decodeToken } from "../helpers/jwt";
import { VITE_API_URL } from "../config";

export const useAuthStore = create((set, get: any) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
  logout: () => set({ token: '' }),
  isAuthenticated: () => {
    return get().token.length > 0;
  },
}));
