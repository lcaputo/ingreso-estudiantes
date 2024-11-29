import { create } from "zustand";
import { VITE_API_URL } from "../config";
import { Navigate } from "react-router-dom";

export const fetchStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  fetchData: async (endpoint: string, method: string, data?: any) => {
    set({ isLoading: true });
    try {
      const request = await fetch(`${VITE_API_URL}/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: data ? JSON.stringify(data) : null,
      });
      if (request.status === 401) {
        set({ isLoading: false, error: "Unauthorized" });
        console.log("Unauthorized");
        return <Navigate to="/login" />;
      }
      const response = await request.json();
      set({ data: response, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: error });
    }
  },
}));
