import { useEffect, useState } from "react";
import { usePerson } from "../hooks/usePerson";
import { Device } from "../interfaces/devices.interface";
import { shallow } from "zustand/shallow";
import { EntryViews } from "../enums/EntryViews";
import { useEntry } from "../hooks/useEntry";
import { IVehicle } from "../interfaces/vehicles.interface";

interface Props {
  view: any;
  setView: any;
}

const Vehicles = (props: Props) => {
  const [selectedDevicesID, setSelectedDevicesID] = useState<number[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  const { entry } = useEntry((state) => ({ entry: state.entry }), shallow);

  function getDevices() {
    fetch("http://localhost:3000/vehicle", {
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
        console.log("Error getting devices");
      });
  }

  useEffect(() => {
    getDevices();
    console.log("view", props.view);
  }, []);

  function submit(event: any) {
    event.preventDefault();
    // get form keys
    const form = event.target;
    const data = new FormData(form);
    const object: any = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    fetch("http://localhost:3000/records/vehicle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idVehicleType: parseInt(object.idVehicleType),
        badge: object.badge,
        idRecord: entry.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.data);
        getDevices();
        props.setView(EntryViews.vehicle_list);
      })
      .catch(() => {
        console.log("Error getting devices");
      });
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {props.view == EntryViews.vehicle_list && vehicles && vehicles.length > 0
          ? vehicles.map((vehicle: IVehicle) => {
              return (
                <a
                  className={
                    `px-4 py-8 hover:bg-gray-200 bg-gray-100
                  border-b-2 shadow-lg flex cursor-pointer ` +
                    (selectedDevicesID.includes(vehicle.id)
                      ? " border-green-500 border-opacity-50"
                      : "border-gray-500 border-opacity-20")
                  }
                  key={vehicle.id}
                  onClick={() => {
                    let exists = selectedDevicesID.includes(vehicle.id);
                    console.log("exists", exists, vehicles, vehicle.id);

                    if (exists) {
                      setSelectedDevicesID(
                        selectedDevicesID.filter((id) => id !== vehicle.id)
                      );
                    } else {
                      setSelectedDevicesID([...selectedDevicesID, vehicle.id]);
                    }
                  }}
                >
                  <div className="text-green-600 my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-motorbike"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
                      <path d="M13 6h2l1.5 3l2 4" />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-2xl font-medium text-gray-800 leading-none">
                      {vehicle.vehicleType.vendor || ""}
                    </p>
                    <small className="text-gray-500">
                      {vehicle.badge || ""}
                    </small>
                  </div>
                  {selectedDevicesID.includes(vehicle.vehicleType.id) ? (
                    <div className="ms-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-check text-green-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    </div>
                  ) : (
                    ""
                  )}
                </a>
              );
            })
          : ""}
      </div>

      {props.view === EntryViews.vehicle_create && (
        <form onSubmit={submit}>
          <div className="px-4 mb-6">
            <label className="text-gray-600 text-xl">Tipo</label>
            <select
              name="idVehicleType"
              className="w-full border-b-2 border-gray-300 py-2"
            >
              <option value="1">Moto</option>
              <option value="2">Carro</option>
            </select>
          </div>
          <div className="px-4 mb-6">
            <label className="text-gray-600 text-xl">Placa</label>
            <input
              type="text"
              name="badge"
              placeholder="ABC123"
              className="w-full border-b-2 border-gray-300 py-2 placeholder-gray-300"
            />
          </div>
          <button
            className="mt-14 py-5 bg-primary text-white w-full rounded-md"
            type="submit"
          >
            Guardar
          </button>
          <button
            className="mt-4 py-5 bg-gray-300 text-black w-full rounded-md"
            onClick={() => {
              if (props.view === EntryViews.vehicle_create) {
                props.setView(EntryViews.vehicle_list);
              }
              if (props.view === EntryViews.vehicle_list) {
                props.setView(EntryViews.entry);
              }
            }}
          >
            Atras
          </button>
        </form>
      )}

      {props.view === EntryViews.vehicle_list && (
        <>
          <button
            className="mt-14 py-5 bg-[#1F2937] text-white w-full rounded-md"
            onClick={() => {
              props.setView(EntryViews.vehicle_create);
            }}
          >
            {props.view === EntryViews.vehicle_create
              ? "Guardar"
              : "Nuevo vehiculo"}
          </button>
          <button
            className="mt-4 py-5 bg-primary text-white w-full rounded-md"
            onClick={() => {
              if (props.view === EntryViews.vehicle_create) {
                props.setView(EntryViews.vehicle_list);
              }
              if (props.view === EntryViews.vehicle_list) {
                props.setView(EntryViews.entry);
              }
            }}
          >
            Listo
          </button>
        </>
      )}
    </>
  );
};
export default Vehicles;
