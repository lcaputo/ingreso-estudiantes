import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/admin";
import Table from "../components/table";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

export function Entries() {
  const [currentPage, setCurrentPage] = useState(10);

  const {
    data: entries,
    isLoading,
    isError,
    error,
    meta,
  } = useFetch(`records?page=1&take=${currentPage}&order=ASC`);


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
        <Table
          enpoint="records"
          dataSet={entries}
          isLoading={isLoading}
          headers={columns}
          meta={meta}
          changePagiantion={setCurrentPage}
        />
      </AdminLayout>
    </>
  );
}
