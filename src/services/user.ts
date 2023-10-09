export async function CreateUser(user: any) {
  if (!user.roles) return;

  user.roles = user.roles.map((role: any) => parseInt(role));

  const response = await fetch("user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,
      username: user.fullname,
      email: user.email,
      password: user.password,
      roles: user.roles,
    }),
  });

  return response;
}
