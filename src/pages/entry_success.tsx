import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Device } from "../interfaces/devices.interface";

export function EntrySuccess() {
  const [names, setNames] = useState<string>("Laszlo Vittorio");
  const [lastNames, setLastNames] = useState<string>("Caputo Adam");
  const [id, setId] = useState<string>("1234095144");
  const [nameOfProgram, setNameOfProgram] = useState<string>(
    "Tecnologo en analisis y desarrollo de software"
  );
  enum views {
    entry,
    device,
    vehicle,
    create_device,
  }
  const [view, setView] = useState<number>(views.entry);
  const [devices, setDevices] = useState<Device[]>([
    { name: "Macbook Air", color: "Dorada", serial: "AGDFEDS-32DW" },
  ]);

  useEffect(() => {}, []);

  function title() {
    switch (view) {
      case views.entry:
        return "Tecnologo en analisis y desarrollo de software";
      case views.device:
        return "Dispositivo";
      case views.vehicle:
        return "Vehiculo";
    }
  }

  function generateForm() {
    switch (view) {
      case views.device:
        return (
          <form>
            <div className="px-4 mb-6">
              <label className="text-gray-600 text-xl">Marca</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 py-2"
                value={names}
                onChange={(e) => setNames(e.target.value)}
              />
            </div>
            <div className="px-4 mb-6">
              <label className="text-gray-600 text-xl">Color</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 py-2"
                value={lastNames}
                onChange={(e) => setLastNames(e.target.value)}
              />
            </div>
            <div className="px-4 mb-6">
              <label className="text-gray-600 text-xl">Serial</label>
              <input
                type="text"
                className="w-full border-b-2 border-gray-300 py-2"
                value={lastNames}
                onChange={(e) => setLastNames(e.target.value)}
              />
            </div>
          </form>
        );
      case views.vehicle:
        return <></>;
    }
  }

  function getDevices() {
    return (
      <>
        {devices.map((device: Device) => {
          return (
            <a
              className="px-4 py-8 hover:bg-gray-100 flex cursor-pointer"
              key={device.serial}
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
                  {device.name}
                </p>
                <p className="text-xl text-gray-500">{device.color}</p>
                <small className="text-gray-500">{device.serial}</small>
              </div>
            </a>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="w-100 text-center mt-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-black mb-8 w-96 text-left border-b two-lines-text-elipsis">
          <small className="text-black text-xl">
            {view === views.entry ? "Programa:" : "Registro:"}
          </small>
          <br />
          {title()}
        </h1>
        {view === views.entry ? (
          <h2 className="text-2xl font-bold text-gray-500 w-96 text-left">
            <small className="text-black text-xl">Instructor:</small>
            <br />
            Stivenson Garcia
          </h2>
        ) : (
          ""
        )}
      </div>
      aqui {devices.length}
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="mx-auto right-0 mt-2 w-96">
          <div className="bg-white rounded overflow-hidden shadow-lg">
            {view === views.entry ? (
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
                <p className="pt-2 text-4xl font-semibold text-gray-50">
                  {names} <br /> {lastNames}
                </p>
                <p className="text-xl text-gray-100 mt-5">{id}</p>
              </section>
            ) : (
              <>
                {view == views.device && devices.length > 0
                  ? getDevices()
                  : ''}
                  {view == views.create_device ? generateForm() : ''}
              </>
            )}

            {view === views.entry ? (
              <div className="border-b">
                <a
                  className="px-4 py-8 hover:bg-gray-100 flex cursor-pointer"
                  onClick={() => setView(views.device)}
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
                      Dispositivo
                    </p>
                    <p className="text-xl text-gray-500">
                      Ingresa algun dispositivo?
                    </p>
                  </div>
                </a>
                <hr />
                <a
                  className="px-4 py-8 hover:bg-gray-100 flex cursor-pointer"
                  onClick={() => setView(views.vehicle)}
                >
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
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <button className="mt-14 mb-6 py-5  bg-primary text-white w-full rounded-md" onClick={() => {
                view == views.device ? setView(views.create_device) : setView(views.create_device);
            }}>
              {view == views.create_device ? "Guardar" : "Nuevo"}
            </button>
            <Link
              to={view == views.entry ? "/entry" : ""}
              onClick={() => (view != views.entry ? setView(views.entry) : "")}
            >
              <button className="py-5 bg-gray-300 text-gray-600 w-full rounded-md">
                {view == views.entry ? "Nuevo ingreso" : "Volver"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
