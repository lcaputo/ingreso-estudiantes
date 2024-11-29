import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/admin";
import Table from "../components/table";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { VITE_API_URL } from "../config";

export function Entries() {
  const [entries, setEntries] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  function getEntries(page: number = 1) {
    fetch(VITE_API_URL + `/records?page=${page}&take=10&order=ASC`).then((res) => {
      return res.json();
    }).then((data) => {
      setEntries(data);
      setIsLoading(false);
    })
  };

  useEffect(() => {
    console.log(entries);
    getEntries();
  }, [])


  const columns = [
    {
      key: "person.doctType.name",
      label: "Tipo documento",
    },
    {
      key: "person.document",
      label: "Número documento",
    },
    {
      key: "person.firtsName",
      label: "Nombres",
    },
    {
      key: "person.lastName",
      label: "Apellidos",
    },
    {
      key: "person.personTypes.name",
      label: "Tipo persona",
    },
    {
      key: "person.groups[0].code",
      label: "Ficha",
    },
    {
      key: "person.haveDevices",
      label: "dispositivos",
      type: "boolean",
    },
    {
      key: "person.haveVehicles",
      label: "vehiculos",
      type: "boolean",
    },
    {
      key: "person.recorEntry[0].checkIn",
      label: "Ingreso",
      type: "date",
    },
  ];

  return (
    <>
      <AdminLayout>
        {entries && (
          <Table
          enpoint="records"
          dataSet={entries.data}
          isLoading={isLoading}
          headers={columns}
          meta={entries.meta}
          fetchData={getEntries}
          isNew={false}
        />
        )}
      </AdminLayout>
    </>
  );
}
