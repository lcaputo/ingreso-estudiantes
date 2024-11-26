import { create } from "zustand";

export const useAuthStore = create((set, get: any) => ({

  token: localStorage.getItem("access_token") || '',

  setToken: (tkn: string) => () => {
    localStorage.setItem("access_token", tkn);
    set({ tkn });
    return
  },
  logout: () => set({ token: '' }),
  isAuthenticated: () => {
    return get().token.length > 0;
  },
}));
