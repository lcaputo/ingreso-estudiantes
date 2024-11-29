import { useEffect, useRef, useState } from "react";
import { NoData } from "../components/noData";
import AdminLayout from "../layout/admin";
import Dropzone from "react-dropzone";
import { counterStore } from "../stores/counterStore";
import { VITE_API_URL } from "../config";

interface EventSourceData {
  data: Array<any> | any;
}

export default function Upload() {
  const file = useRef(new Blob());
  const [history, setHistory] = useState<any>([]);
  const [failed, setFailed] = useState<any>([]);
  const setServices = counterStore((state: any) => state.setServices);
  const files = useRef<any>([]);

  let eventSource: any;

  useEffect(() => {
    invokeSSEEventSource();
  }, []);

  function invokeSSEEventSource() {
    eventSource = new EventSource(`${VITE_API_URL}/events/sse`);

    eventSource.onmessage = ({ data }: EventSourceData) => {
      const d = JSON.parse(data);
      console.log(d.length);
      // data = JSON.parse(data);
      console.log(d);

      setServices(d);

      // FIXME: this is not working
      // if (d.length === 0) {
      //   eventSource.close();
      //   return;
      // }

      // inc();
    };
    eventSource.onerror = (error: any) => {
      console.log(error);
      eventSource.close();
    };
  }

  const submitFiles = async () => {
    let form = new FormData();
    console.log(files.current?.files[0]);

    form.append("file", files.current?.files[0]);
    await fetch(`${VITE_API_URL}/events/upload`, {
      method: "POST",
      body: form,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}` || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHistory((prev: any) => [...prev, data]);
      })
      .catch((e) => {
        console.log(e);
        setFailed((prev: any) => [...prev, file]);
      });
    console.log("done", history);
  };

  return (
    <AdminLayout>
      {/* history of uploaded documents */}
      {/* {history.map((f: any) => {
        return <div key={f.name}>{f.name}</div>;
      })}

      {failed.map((f: any) => {
        return <div key={f.name}>{f.name}</div>;
      })} */}

      {/* <Dropzone noClick onDrop={(acceptedFiles) => submitFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="relative"
            >
              <input {...getInputProps()} />
              <NoData />
            </div>
          </section>
        )}
      </Dropzone> */}
      <div className="flex justify-center">
        <form className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              type="file"
              id="dropzone-file"
              ref={files}
              className="hidden"
              onChange={submitFiles}
            />
          </label>
        </form>
      </div>

      {/* <input
        type="file"
        onChange={(event: any) => {
          console.log(event);
          file.current = event.target.files[0];
        }}
      />
      <button
        onClick={async () => {
          let form = new FormData();
          form.append("file", file.current);
          await fetch(`${VITE_API_URL}/events/upload`, {
            method: "POST",
            body: form,
            credentials: "include",
          });
        }}
      >
        test
      </button> */}
    </AdminLayout>
  );
}
