import { VITE_API_URL } from "../config";

import.meta.env;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // cors
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
      // alow credentials
      "Access-Control-Allow-Credentials": "true",
      // allow methods
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // allow headers
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
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
