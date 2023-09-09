import { VITE_API_URL } from "../config";

const headers = new Headers({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET,PATCH,HEAD,OPTIONS",
  "Access-Control-Allow-Headers":
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
});

export async function HttpGet(endpoint: string) {
  const request = await fetch(`${VITE_API_URL}/${endpoint}`, {
    method: "GET",
    headers: headers,
    credentials: "include",
  });
  const response = await request.json();
  return response;
}

export async function HttpPatch(endpoint: string, body: any) {
  const request = await fetch(`${VITE_API_URL}/${endpoint}`, {
    method: "PATCH",
    headers: headers,
    credentials: "include",
    body: JSON.stringify(body),
  });
  const response = await request.json();
  return response;
}
