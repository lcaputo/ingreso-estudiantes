import toast from "react-hot-toast";
import { VITE_API_URL } from "../config";
import { User } from "../types";
import { HttpPatch } from "./http";

export async function CreateUser(user: any) {
  if(!user.roles) return;

  user.roles = user.roles.map((role: any) => parseInt(role));

  const response = await HttpPatch("user", {
    "id": 0,
    "username": user.fullname,
    "email": user.email,
    "password": user.password,
    "roles": user.roles
  });

  return response;
}
