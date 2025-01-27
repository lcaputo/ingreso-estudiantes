import { useEffect, useState } from "react";
import { usePerson } from "../hooks/usePerson";
import { Device } from "../interfaces/devices.interface";
import { shallow } from "zustand/shallow";
import { EntryViews } from "../enums/EntryViews";
import { useEntry } from "../hooks/useEntry";
import { IVehicle, VehicleType } from "../interfaces/vehicles.interface";
import { VITE_API_URL } from "../config";

interface Props {
  view: any;
  setView: any;
  vehicles: IVehicle[];
  setVehicles: any;
  getVehicles: any;
  selectedVehiclesID: number[];
  setSelectedVehiclesID: any;
}

const Vehicles = (props: Props) => {

  const { entry } = useEntry((state) => ({ entry: state.entry }), shallow);

  function getDevices() {
    fetch(`${VITE_API_URL}/vehicle`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.data);
        props.setVehicles(res.data);
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
    fetch(`${VITE_API_URL}/records/vehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
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

        {props.view == EntryViews.vehicle_list && props.vehicles && props.vehicles.length > 0
          ? props.vehicles.map((vehicle: IVehicle) => {
              return (
                <a
                  className={
                    `px-4 py-8 bg-gray-100
                  border-b-2 shadow-lg flex cursor-pointer border-gray-500 border-opacity-20`
                  }
                  key={vehicle.id}
                  onClick={() => {
                    // let exists = props.selectedVehiclesID.includes(vehicle.id);
                    // console.log("exists", exists, props.vehicles, vehicle.id);

                    props.setSelectedVehiclesID([vehicle.id]);
                    props.setView(EntryViews.entry)

                    // if (exists) {
                    //   props.setSelectedVehiclesID(
                    //     props.selectedVehiclesID.filter((id) => id !== vehicle.id)
                    //   );
                    // } else {
                    //   props.setSelectedVehiclesID([...props.selectedVehiclesID, vehicle.id]);
                    // }
                    console.log("selectedVehiclesID", props.selectedVehiclesID);

                  }}
                >
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-motorbike"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M19 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" /><path d="M13 6h2l1.5 3l2 4" /></svg>
                  <div className="pl-3">
                    <p className="text-2xl font-medium text-gray-800 leading-none">
                      {vehicle.vehicleType.vendor || ""}
                    </p>
                    <small className="text-gray-500">
                      {vehicle.badge || ""}
                    </small>
                  </div>
                </a>
              );
            })
          : ""}


<a
                  className={
                    `px-4 py-8 bg-gray-100
                  border-b-2 shadow-lg flex cursor-pointer border-gray-500 border-opacity-20`
                  }
                  onClick={() => {
                    // let exists = props.selectedVehiclesID.includes(vehicle.id);
                    // console.log("exists", exists, props.vehicles, vehicle.id);

                    props.setSelectedVehiclesID([]);
                    props.setView(EntryViews.entry)

                    // if (exists) {
                    //   props.setSelectedVehiclesID(
                    //     props.selectedVehiclesID.filter((id) => id !== vehicle.id)
                    //   );
                    // } else {
                    //   props.setSelectedVehiclesID([...props.selectedVehiclesID, vehicle.id]);
                    // }
                    console.log("selectedVehiclesID", props.selectedVehiclesID);

                  }}
                >
                  <div className="pl-3">
                    <p className="text-2xl font-medium text-gray-800 leading-none">
                      Ninguno
                    </p>
                  </div>
                </a>
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
              maxLength={6}
              onInput={(e) => {
                let input = e.currentTarget.value;

                // if not letters or numbers remove the last character
                if (!input.match(/[A-Z0-9]/g)) {
                  input = input.slice(0, -1);
                }

                input = input.toUpperCase();
                // detect if the input is a letter or a number
                // if it's a letter only allow 4 letters
                // if it's a number only allow 3 numbers

                let letters = input.match(/[A-Z]/g);
                let numbers = input.match(/[0-9]/g);

                if (letters && letters.length > 4) {
                  input = input.slice(0, 4);
                }
                if (numbers && numbers.length > 3) {
                  input = input.slice(0, 3);
                }

                e.currentTarget.value = input;


              }}
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
            className="mt-4 py-5 bg-tertiary text-white w-full rounded-md"
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
