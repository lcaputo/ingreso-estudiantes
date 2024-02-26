import { useEffect, useState } from "react";
import { usePerson } from "../hooks/usePerson";
import { Device } from "../interfaces/devices.interface";
import { shallow } from "zustand/shallow";
import { EntryViews } from "../enums/EntryViews";
import { useEntry } from "../hooks/useEntry";

interface Props {
  view: any;
  setView: any;
}

const Devices = (props: Props) => {
  const [selectedDevicesID, setSelectedDevicesID] = useState<number[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);

  const { entry } = useEntry((state) => ({ entry: state.entry }), shallow);

  function getDevices() {
    fetch("http://localhost:3000/device", {
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
    fetch("http://localhost:3000/records/device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        idDeviceType: parseInt(object.idDeviceType),
        serialId: object.serialId,
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
        props.setView(EntryViews.device_list);
      })
      .catch(() => {
        console.log("Error getting devices");
      });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        {props.view == EntryViews.device_list && devices && devices.length > 0
          ? devices.map((device: Device) => {
              return (
                <a
                  className={
                    `px-4 py-8 bg-gray-100
                  border-b-2 shadow-lg flex cursor-pointer ` +
                    (selectedDevicesID.includes(device.id)
                      ? " border-green-500 border-opacity-50 bg-green-200"
                      : "border-gray-500 border-opacity-20")
                  }
                  key={device.id}
                  onClick={() => {
                    let exists = selectedDevicesID.includes(device.id);
                    console.log("exists", exists, devices, device.id);

                    if (exists) {
                      setSelectedDevicesID(
                        selectedDevicesID.filter((id) => id !== device.id)
                      );
                    } else {
                      setSelectedDevicesID([...selectedDevicesID, device.id]);
                    }
                  }}
                >
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
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 19l18 0" />
                      <path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-2xl font-medium text-gray-800 leading-none">
                      {device.deviceType.brand}
                    </p>
                    <small className="text-gray-500">
                      {device.serialId || "MYL12345678"}
                    </small>
                  </div>
                  {selectedDevicesID.includes(device.id) ? (
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

      {props.view === EntryViews.device_create && (
        <form onSubmit={submit}>
          <div className="px-4 mb-6">
            <label className="text-gray-600 text-xl">Tipo</label>
            <select
              name="idDeviceType"
              className="w-full border-b-2 border-gray-300 py-2"
            >
              <option value="1">Laptop</option>
              <option value="2">Celular</option>
              <option value="3">Tablet</option>
            </select>
          </div>
          <div className="px-4 mb-6">
            <label className="text-gray-600 text-xl">Serial</label>
            <input
              type="text"
              name="serialId"
              className="w-full border-b-2 border-gray-300 py-2"
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
              if (props.view === EntryViews.device_create) {
                props.setView(EntryViews.device_list);
              }
              if (props.view === EntryViews.device_list) {
                props.setView(EntryViews.entry);
              }
            }}
          >
            Atras
          </button>
        </form>
      )}

      {props.view === EntryViews.device_list && (
        <>
        <button
        className="mt-14 py-5 bg-[#1F2937] text-white w-full rounded-md"
        onClick={() => {
          props.setView(EntryViews.device_create);
        }}
      >
        {props.view === EntryViews.device_create
          ? "Guardar"
          : "Nuevo dispositivo"}
      </button>
      <button
        className="mt-4 py-5 bg-primary text-white w-full rounded-md"
        onClick={() => {
          if (props.view === EntryViews.device_create) {
            props.setView(EntryViews.device_list);
          }
          if (props.view === EntryViews.device_list) {
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
export default Devices;
