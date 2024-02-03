import { create } from "zustand";
import { decodeToken } from "../helpers/jwt";

export const useAuthStore = create((set, get: any) => ({
  token: "",
  setToken: (token: string) => set({ token: token }),
  logout: () => set({ token: '' }),
  isAuthenticated: () => {
    try {
      if (!get().token) return false;
      const tokenPayload = decodeToken(get().token);
      if (tokenPayload.exp < Date.now() / 1000) {
        console.log("token expired");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  },
}));
