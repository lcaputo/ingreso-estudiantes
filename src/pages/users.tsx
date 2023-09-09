import { useEffect, useMemo, useState } from "react";
import Table from "../components/table";
import AdminLayout from "../layout/admin";
import { VITE_API_URL } from "../config";
import { User } from "../types";
import { getRoles } from "../services/role";
import { Roles } from "../interfaces/roles.interface";
import { fetchStore } from "../stores/fetchStore";

interface dataSet {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  inside?: boolean;
}

export default function Users() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const fetchData = fetchStore((state: any) => state.fetchData);

  useEffect(() => {
    getusers();
    fetchRoles();
  }, []);

  const [roles, setRoles] = useState<Roles[]>([]);
  function fetchRoles() {
    getRoles().then((res) => {
      setRoles(res);
    });
  }

  const headers = [
    {
      key: "roles",
      label: "Roles",
      type: "dropdown",
      options: roles,
      placeholder: "Select a role",
    },
    {
      key: "fullname",
      label: "Full name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "password",
      label: "Password",
      type: "password",
    },
  ];

  return (
    <AdminLayout>
      {/* map users */}
      <Table
        headers={headers}
        dataSet={users}
        fetch={getusers}
        isLoading={isLoading}
      />
    </AdminLayout>
  );


  async function getusers(): Promise<void> {
    setIsLoading(true);
    const response = await fetchData('user', "GET");
    // const response = await fetch(`${VITE_API_URL}/user`, {
    //   // send cookie access_token
    //   credentials: "include",
    //   method: "GET",
    // });
    // const data = await response.json();
    // setUsers(response.data);
    console.log(response);
    setIsLoading(false);
    return response
  }
}
