import { useState } from "react";
import CustomModal from "./modal";
import { Loader } from "./loader";
import moment from "moment";

interface nameKey {
  label: string;
  key: string;
}

interface Props {
  headers: nameKey[];
  dataSet?: any[];
  fetch?: () => void;
  isLoading?: boolean;
  enpoint?: string;
}

export default function Table({
  headers,
  dataSet,
  fetch,
  isLoading,
  enpoint,
}: Props) {
  const [openModal, setOpenModal] = useState<boolean | undefined>(false);

  function toggleModal() {
    console.log("toggle");
    setOpenModal(!openModal);
  }

  function getRow(objeto: any, cadenaAcceso: any) {
    const propiedades = cadenaAcceso.key.split("."); // Dividir la cadena de acceso en propiedades
    let valor = objeto;

    for (const propiedad of propiedades) {
      const matchArray = propiedad.match(/(.+)\[(\d+)\]/); // Buscar índices entre corchetes
      if (matchArray) {
        const propiedadObjeto = matchArray[1];
        const indice = parseInt(matchArray[2]);
        valor = valor[propiedadObjeto]; // Acceder a la propiedad del objeto
        if (Array.isArray(valor)) {
          valor = valor[indice]; // Acceder al elemento del arreglo
        } else {
          return undefined; // Devolver undefined si la propiedad no es un arreglo
        }
      } else {
        if (valor.hasOwnProperty(propiedad)) {
          valor = valor[propiedad]; // Acceder a la propiedad actual
        } else {
          return undefined; // Devolver undefined si la propiedad no existe
        }
      }
    }

    return valor; // Devolver el valor final
  }

  return (
    <>
      {isLoading === true ? (
        <div className="container text-center p-20">
          <Loader />
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 bg-white">
            {/* Buttons */}
            <section className="flex gap-4 me-4">
              {/* Filter */}
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownFilter"
                  className="inline-flex items-center font-medium rounded-lg text-sm px-3 py-1.5
                      text-gray-500 bg-gray-50 hover:bg-gray-100 shadow-sm shadow-gray-300"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Filtros
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownFilter"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center font-medium rounded-lg text-sm px-3 py-1.5
                      text-gray-500 bg-gray-50 hover:bg-gray-100 shadow-sm shadow-gray-300"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Acciones
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownAction"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                  <ul
                    className="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
              {/* New */}
              <div>
                <button
                  onClick={toggleModal}
                  className="inline-flex items-center font-medium rounded-lg text-sm px-3 py-1.5
                      text-white bg-primary shadow-sm shadow-gray-300"
                >
                  Nuevo
                </button>
              </div>
            </section>

            {/* Search */}
            <section>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block p-2 pl-10 text-sm text-gray-900 border-none rounded-lg w-80 bg-gray-50 shadow-sm shadow-gray-300"
                  placeholder="Search for users"
                />
              </div>
            </section>
          </div>

          {/* Table */}
          <table className="w-full text-sm text-left text-gray-500 mb-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              {/* Table header */}
              <tr>
                {headers.map((header: any) => (
                  <>
                    {header.hide !== true && (
                      <th
                        key={header.key}
                        className="font-semibold text-left p-4"
                      >
                        {header.label}
                      </th>
                    )}
                  </>
                ))}
              </tr>
            </thead>
            <tbody className="relative">
              {dataSet &&
                dataSet.map((data, index) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={"row-" + index}
                  >
                    {headers.map((header: any) => (
                      <>
                        {header.type === "boolean" && (
                          <td
                            key={header.key}
                            className="p-4 whitespace-nowrap"
                          >
                            {getRow(data, header) ? "Si" : "No"}
                          </td>
                        )}

                        {header.type && header.type === "date" && (
                          <td
                            key={header.key}
                            className="p-4 whitespace-nowrap"
                          >
                            {moment(getRow(data, header)).format(
                              "DD/MM/YYYY HH:mm A"
                            )}
                          </td>
                        )}

                        {header.type !== "date" &&
                          header.type !== "boolean" && (
                            <td
                              key={header.key}
                              className="p-4 whitespace-nowrap"
                            >
                              {getRow(data, header)}
                            </td>
                          )}
                      </>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <CustomModal
        openModalInput={openModal}
        toggleModal={toggleModal}
        headers={headers}
        endpoint={enpoint}
      />
    </>
  );
}
