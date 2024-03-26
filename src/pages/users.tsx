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
  const [users, setUsers] = useState<any>(null);
  // const {
  //   data: users,
  //   meta: metaUsers,
  //   loading: loadingUsers,
  //   error: errorUser,
  // } = useFetch("user");
  const {
    data: roles,
    loading: loadingRoles,
    error: errorRoles,
  } = useFetch(`user?page=1&take=${currentPage}&order=ASC`);

  function getUsers(page: number = 1) {
    setIsLoading(true);
    fetch(`http://localhost:3000/user?page=${page}&take=${currentPage}&order=ASC`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUsers()
  }, []);

  const headers = [
    {
      key: "role[0].tipo",
      name: "roles",
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
      type: "email",
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
      {users && (
        <Table
        headers={headers}
        dataSet={users.data}
        fetchData={getUsers}
        isLoading={isLoading}
        enpoint="user"
        meta={users.meta}
      />
      )}
    </AdminLayout>
  );

}
