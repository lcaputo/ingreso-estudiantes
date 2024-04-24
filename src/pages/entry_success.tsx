import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePerson } from "../hooks/usePerson";
import { shallow } from "zustand/shallow";
import Devices from "../components/Devices";
import Vehicles from "../components/Vehicle";
import { EntryViews } from "../enums/EntryViews";
import { useEntry } from "../hooks/useEntry";
import { VITE_API_URL } from "../config";
import { Device } from "../interfaces/devices.interface";
import { IVehicle } from "../interfaces/vehicles.interface";
import { IEntry } from "../interfaces/entry.interface";
import toast from "react-hot-toast";

export function EntrySuccess() {
  const [view, setView] = useState<number>(EntryViews.entry);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevicesID, setSelectedDevicesID] = useState<number[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [selectedVehiclesID, setSelectedVehiclesID] = useState<number[]>([]);


  const { entry } = useEntry(
    (state) => ({ entry: state.entry }),
    shallow
  );

  function getDevices() {
    fetch(`${VITE_API_URL}/device/person/${entry.person.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.data);
        setDevices(res.data);
      })
      .catch(() => {
        console.log("Error getting devices");
      });
  }

  function getVehicles() {
    fetch(`${VITE_API_URL}/vehicle/person/${entry.person.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.data);
        setVehicles(res.data);
      })
      .catch(() => {
        console.log("Error getting vehicles");
      });
  }

  function associateDevices2Entry() {
    selectedDevicesID.map((deviceID: number) => {
      fetch(`${VITE_API_URL}/records/device/in-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idRecord: entry.id,
          idDevice: deviceID,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          console.log("Error getting vehicles");
        });
    });
  }

  function associateVehicles2Entry() {
    selectedVehiclesID.map((vehicleID: number) => {
      fetch(`${VITE_API_URL}/records/vehicle/in-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idRecord: entry.id,
          idVehicle: vehicleID,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          console.log("Error getting vehicles");
        });
    });
  }


  const navigate = useNavigate();

  useEffect(() => {
    console.log('===>',entry);

    if (entry && entry.id === 0) {
      return
    } else {
      if(entry.out === true) {
        toast.success("Saliste, nos vemos pronto!");
        window.location.href = "/exit";
      } else {
        toast.success("Entrada exitosa!");
        getDevices();
        getVehicles();
      }
    }
  }, [entry]);

  return (
    <>
      {entry.out === false ? (
        <>
          <div className="w-100 text-center mt-8 flex flex-col items-center">
            {/* <h1 className="text-4xl font-bold text-black mb-8 w-96 text-left border-b two-lines-text-elipsis">
            <small className="text-black text-xl">
              {view === EntryViews.entry ? "Programa:" : "Registro:"}
            </small>
            <br />
            {title()}
          </h1> */}
            {view === EntryViews.entry ? (
              <>
                {/* <h2 className="text-2xl font-bold text-gray-500 w-96 text-left mb-8">
              <small className="text-black text-xl">Instructor:</small>
              <br />
              Stivenson Garcia
            </h2> */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto right-0 mt-2 w-96">
              <div className="rounded overflow-hidden">
                {view === EntryViews.entry && (
                  <>
                    <section className="text-center p-6 bg-gray-800 border-b">
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="h-24 w-24 text-white rounded-full mx-auto"
                        width="32"
                        height="32"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
                        ></path>
                      </svg>
                      <p className="pt-2 text-3xl font-semibold text-gray-50">
                        {entry.person.firtsName} <br /> {entry.person.lastName}
                      </p>
                      <p className="text-xl text-gray-100 mt-1">
                        {entry.entryType.type}
                      </p>
                      <p className="text-xl text-gray-100 mt-2">
                        {entry.person.document}
                      </p>
                    </section>
                    <div className="border-b">
                      <section
                        className="pt-8 py-6 hover:bg-gray-100  cursor-pointer"
                        onClick={() => setView(EntryViews.device_list)}
                      >
                        <a className="px-4 flex">
                          <div className="text-green-600 my-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-device-laptop"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M3 19l18 0" />
                              <path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
                            </svg>
                          </div>
                          <div className="pl-3">
                            <p className="text-2xl font-medium text-gray-800 leading-none">
                              Dispositivo
                            </p>
                            <p className="text-xl text-gray-500">
                              Ingresa algun dispositivo?
                            </p>
                          </div>
                        </a>
                        <div
                          className="device-list"
                          style={{ maxHeight: "192px", overflowY: "scroll" }}
                        >
                          {devices.length > 0 &&
                            devices.map((device) => {
                              return selectedDevicesID.includes(device.id) ? (
                                <>
                                  <div className="px-8 mt-4 flex">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-arrow-right text-green-500 me-2"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      strokeWidth="2"
                                      stroke="currentColor"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <line x1="5" y1="12" x2="19" y2="12" />
                                      <line x1="15" y1="16" x2="19" y2="12" />
                                      <line x1="15" y1="8" x2="19" y2="12" />
                                    </svg>
                                    {device.deviceType.brand}: {device.serialId}
                                  </div>
                                </>
                              ) : (
                                <></>
                              );
                            })}
                        </div>
                      </section>
                      <hr />
                      <section
                        className="pt-8 pb-6 hover:bg-gray-100  cursor-pointer"
                        onClick={() => setView(EntryViews.vehicle_list)}
                      >
                        <a className="px-4 flex">
                          <div className="text-gray-800 my-auto">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-motorbike"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                              <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                              <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
                              <path d="M13 6h2l1.5 3l2 4" />
                            </svg>
                          </div>
                          <div className="pl-3">
                            <p className="text-2xl font-medium text-gray-800 leading-none">
                              Vehiculo
                            </p>
                            <p className="text-xl text-gray-500">
                              Tiene vehiculo parqueado?
                            </p>
                          </div>
                        </a>
                        <div
                          className="device-list"
                          style={{ maxHeight: "192px", overflowY: "scroll" }}
                        >
                          {vehicles.length > 0 &&
                            vehicles.map((vehicle: IVehicle) => {
                              return selectedVehiclesID.includes(vehicle.id) ? (
                                <>
                                  <div className="px-8 mt-4 flex">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="icon icon-tabler icon-tabler-arrow-right text-green-500 me-2"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      strokeWidth="2"
                                      stroke="currentColor"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <line x1="5" y1="12" x2="19" y2="12" />
                                      <line x1="15" y1="16" x2="19" y2="12" />
                                      <line x1="15" y1="8" x2="19" y2="12" />
                                    </svg>
                                    {vehicle.vehicleType.vendor}:{" "}
                                    {vehicle.badge}
                                  </div>
                                </>
                              ) : (
                                <></>
                              );
                            })}
                        </div>
                      </section>
                    </div>
                    <button
                      className="mt-14 mb-6 py-5  bg-primary text-white w-full rounded-md"
                      onClick={() => {
                        associateDevices2Entry();
                        associateVehicles2Entry();
                        navigate("/success");
                      }}
                    >
                      Terminar
                    </button>
                  </>
                )}
                {(view === EntryViews.device_list ||
                  view === EntryViews.device_create) && (
                  <Devices
                    selectedDevicesID={selectedDevicesID}
                    setSelectedDevicesID={setSelectedDevicesID}
                    getDevices={getDevices}
                    devices={devices}
                    setDevices={setDevices}
                    view={view}
                    setView={setView}
                  />
                )}
                {(view === EntryViews.vehicle_list ||
                  view === EntryViews.vehicle_create) && (
                  <Vehicles
                    selectedVehiclesID={selectedVehiclesID}
                    setSelectedVehiclesID={setSelectedVehiclesID}
                    getVehicles={getVehicles}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    view={view}
                    setView={setView}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* print check-out view */}
          <div className="w-100 flex items-center h-screen">
            <h1 className="text-4xl font-bold text-black mb-8 w-96 text-left border-b two-lines-text-elipsis">
              <small className="text-black text-xl">
                {view === EntryViews.entry ? "Programa:" : "Registro:"}
              </small>
              <br />
            </h1>
            {view === EntryViews.entry ? (
              <>
                <h2 className="text-2xl font-bold text-gray-500 w-96 text-left mb-8">
                  <small className="text-black text-xl">Instructor:</small>
                  <br />
                  Stivenson Garcia
                </h2>
              </>
            ) : (
              ""
            )}
            <h2>saliendo alumno</h2>
            <h3>
              {entry.person.firtsName} {entry.person.lastName}
            </h3>
          </div>
        </>
      )}
    </>
  );
}
