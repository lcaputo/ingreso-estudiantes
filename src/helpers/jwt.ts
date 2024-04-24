export function decodeToken(token: string) {
  const parts = token.split(".");
  const encodedPayload = parts[1];
  const decodedPayload = atob(encodedPayload);
  const payloadObject = JSON.parse(decodedPayload);
  return payloadObject;
}
