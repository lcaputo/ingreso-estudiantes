import { useEffect, useState } from "react";
import Table from "../components/table";
import AdminLayout from "../layout/admin";
import useFetch from "../hooks/useFetch";

interface dataSet {
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  inside?: boolean;
}

export default function Users() {
  const [currentPage, setCurrentPage] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [users, setUsers] = useState<User[]>([]);
  const {
    data: users,
    loading: loadingUsers,
    error: errorUser,
  } = useFetch("user");
  const {
    data: roles,
    loading: loadingRoles,
    error: errorRoles,
  } = useFetch(`user?page=1&take=${currentPage}&order=ASC`);

  useEffect(() => {}, []);

  const headers = [
    {
      key: "role[0].tipo",
      label: "Roles",
      type: "dropdown",
      options: roles,
      placeholder: "Select a role",
    },
    {
      key: "username",
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
      hide: true,
    },
  ];

  return (
    <AdminLayout>
      {/* map users */}
      <Table
        headers={headers}
        dataSet={users}
        fetch={() => {}}
        isLoading={isLoading}
        changePagiantion={setCurrentPage}
      />
    </AdminLayout>
  );

}
