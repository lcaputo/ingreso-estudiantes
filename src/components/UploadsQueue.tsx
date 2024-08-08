"use client";

import { Progress } from "flowbite-react";
import { counterStore } from "../stores/counterStore";
import { useEffect } from "react";

export function UploadsQueue() {
  const services = counterStore((state: any) => state.services);
  const setServices = counterStore((state: any) => state.setServices);

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/events/sse`);

    eventSource.onmessage = ({ data }) => {
      if (data == false) {
        console.log("No data");

        return;
      }
      data = JSON.parse(data);
      if (data.length === 0) {
        eventSource.close();
      }
      setServices(data);
      // inc();
    };
    eventSource.onerror = (error) => {
      console.log(error);
      eventSource.close();
    };
  }, []);

  return (
    <div className="px-10 h-96 flex flex-col justify-center align-middle m-auto w-96">
      <h1>UploadsQueue</h1>
      {services && services.map((s: any) => <Progress className="w-96" progress={s.progress} />)}
    </div>
  );
}
