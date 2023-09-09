import { Card, Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import { counterStore } from "../stores/counterStore";

export function FloatButton() {
  const [show, setShow] = useState(false);
  const services = counterStore((state: any) => state.services);
  const setServices = counterStore((state: any) => state.setServices);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/events/sse");
    console.log(eventSource.withCredentials);
    eventSource.onmessage = ({ data }) => {
      data = JSON.parse(data);
      if (data.length === 0) {
        eventSource.close();
      }
      console.log(data);
      setServices(data);
      // inc();
    };
    eventSource.onerror = (error) => {
      console.log(error);
      eventSource.close();
    };
  }, []);

  return (
    <div className="fixed z-90 bottom-10 right-8">
      <div className="relative flex flex-col items-end">
        {show && (
          <div className="mb-2">
            <Card className="w-80" animate-fade-up>
              <h1 className="font-bold">Queues</h1>
              <hr />
              {services.map((s: any) => (
                <div className="bg-gray-100 py-2 px-4" key={s.id}>
                  <h5 className="font-semibold text-sm">Tarea {s.id}</h5>
                  <span className="flex justify-between">
                    <small>Progreso {Math.floor(s.progress)}%</small>
                    {s.waiting && (
                      <small className="text-red-600 font-semibold">
                        En cola
                      </small>
                    )}
                  </span>
                  <Progress progress={s.progress} />
                </div>
              ))}
            </Card>
          </div>
        )}
        <button
          onClick={() => setShow(!show)}
          title="Contact Sale"
          className="w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-4xl  hover:drop-shadow-xl bg-primary text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-cloud-upload"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
            <path d="M9 15l3 -3l3 3" />
            <path d="M12 12l0 9" />
          </svg>
          {services.length > 0 && (
            <>
              <span className="sr-only">Notifications</span>

              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                {services.length}
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
