import { create } from "zustand";
interface IAuthStore {
  token: string;
  rol: string;
  setToken: (token: string, rol: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
export const useAuthStore = create<IAuthStore>((set, get) => ({
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
