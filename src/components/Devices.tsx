import { useEffect, useState } from "react";
import { usePerson } from "../hooks/usePerson";
import { Device, DeviceType } from "../interfaces/devices.interface";
import { shallow } from "zustand/shallow";
import { EntryViews } from "../enums/EntryViews";
import { useEntry } from "../hooks/useEntry";
import { VITE_API_URL } from "../config";
import toast from "react-hot-toast";
import { log } from "console";

interface Props {
  view: any;
  setView: any;
  devices: Device[];
  setDevices: any;
  getDevices: any;
  selectedDevicesID: number[];
  setSelectedDevicesID: any;
}

const Devices = (props: Props) => {
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);

  const { entry } = useEntry((state) => ({ entry: state.entry }), shallow);

  function getDeviceTypes() {
    fetch(`${VITE_API_URL}/device/types`, {
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
        setDeviceTypes(res.data);
      })
      .catch(() => {
        console.log("Error getting device types");
      });
  }

  useEffect(() => {
    getDeviceTypes();
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
    fetch(`${VITE_API_URL}/records/device`, {
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
        if (!res.ok) {
          toast.error(res.statusText);
          throw new Error("Error creating device");
        }
        return res.json();
      })
      .then((res) => {
        toast.success("Dispositivo creado");
        console.log(res.data);
        props.getDevices();
        props.setView(EntryViews.device_list);
      })
      .catch((err) => {
        console.log("Error getting devices", err.message);
      });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        {props.view == EntryViews.device_list && props.devices && props.devices.length > 0
          ? props.devices.map((device: Device) => {
              return (
                <a
                  className={
                    `px-4 py-8 bg-gray-100
                  border-b-2 shadow-lg flex cursor-pointer ` +
                    (props.selectedDevicesID.includes(device.id)
                      ? " border-green-500 border-opacity-50 bg-green-200"
                      : "border-gray-500 border-opacity-20")
                  }
                  key={device.id}
                  onClick={() => {
                    let exists = props.selectedDevicesID.includes(device.id);
                    console.log("exists", exists, props.devices, device.id);

                    if (exists) {
                      props.setSelectedDevicesID(
                        props.selectedDevicesID.filter((id) => id !== device.id)
                      );
                    } else {
                      props.setSelectedDevicesID([...props.selectedDevicesID, device.id]);
                    }
                  }}
                >
                  <div className="text-green-600 my-auto">
                    <img src={device.deviceType.icon} alt={device.deviceType.brand} />
                  </div>
                  <div className="pl-3">
                    <p className="text-2xl font-medium text-gray-800 leading-none">
                      {device.deviceType.brand}
                    </p>
                    <small className="text-gray-500">
                      {device.serialId || "MYL12345678"}
                    </small>
                  </div>
                  {props.selectedDevicesID.includes(device.id) ? (
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
              {
                (deviceTypes && deviceTypes.length > 0) && deviceTypes.map((type: DeviceType) => {
                  return (
                    <option key={type.id} value={type.id}>{type.brand}</option>
                  )
                })
              }
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
