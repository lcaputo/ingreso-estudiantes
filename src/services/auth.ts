import { VITE_API_URL } from "../config";

import.meta.env;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
    //save cookies
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  // document.cookie = `access_token=${(await response.json()).token}`;

  return response;
};
