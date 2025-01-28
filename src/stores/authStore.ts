import { create } from "zustand";

export const useAuthStore = create((set, get: any) => ({
  token: localStorage.getItem("access_token") || "",
  rol: localStorage.getItem("rol") || "",

  setToken: (token: string, rol: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("rol", rol);
    set({ token, rol });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("rol");
    set({ token: "", rol: "" });
  },
  isAuthenticated: () => {
    return get().token.length > 0;
  },
}));
