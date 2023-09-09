import { VITE_API_URL } from "../config";

export async function getRoles() {
  const response = await fetch(`${VITE_API_URL}/roles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status !== 200) {
    throw new Error("Error fetching roles");
  }

  const data = await response.json();
  const mappedData = data.map((item: any) => {
    return { value: item.id, label: item.tipo };
  });
  return mappedData;
}
