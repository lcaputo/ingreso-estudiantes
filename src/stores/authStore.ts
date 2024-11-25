import { create } from "zustand";

export const useAuthStore = create((set, get: any) => ({

  token: localStorage.getItem("access_token") || '',

  setToken: (token: string) => () => {
    localStorage.setItem("access_token", token);
    set({ token });
    return
  },
  logout: () => set({ token: '' }),
  isAuthenticated: () => {
    return get().token.length > 0;
  },
}));
