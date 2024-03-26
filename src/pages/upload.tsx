import { useEffect, useRef, useState } from "react";
import { NoData } from "../components/noData";
import AdminLayout from "../layout/admin";
import Dropzone from "react-dropzone";
import { counterStore } from "../stores/counterStore";

interface EventSourceData {
  data: Array<any> | any;
}

export default function Upload() {
  const file = useRef(new Blob());
  const [history, setHistory] = useState<any>([]);
  const [failed, setFailed] = useState<any>([]);
  const setServices = counterStore((state: any) => state.setServices);

  let eventSource: any

  useEffect(() => {

  }, [])


  function invokeSSEEventSource() {
    eventSource = new EventSource("http://localhost:3000/events/sse");

    eventSource.onmessage = ({ data }: EventSourceData) => {
      const d = JSON.parse(data);
      console.log(d.length);
      // data = JSON.parse(data);
      console.log(d);

      setServices(d);

      if (d.length === 0) {
        eventSource.close();
        return;
      }
      // inc();
    };
    eventSource.onerror = (error:any) => {
      console.log(error);
      eventSource.close();
    };
  }



  const submitFiles = async (files: any) => {
    invokeSSEEventSource();

    await files.forEach(async (file: any) => {
      let form = new FormData();
      form.append("file", file);
      await fetch("http://localhost:3000/events/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 201) {
            setHistory((history: any) => [...history, file]);
          }
          if (res.status === 400) {
            setFailed((failed: any) => [...failed, file]);
          }
        })
        .catch((e) => {
          // eventSource.close();
        });
      console.log("done", history);
    });
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

      <Dropzone noClick onDrop={(acceptedFiles) => submitFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              className="relative border-2 border-dashed"
            >
              <input {...getInputProps()} />
              <NoData />
            </div>
          </section>
        )}
      </Dropzone>
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
          await fetch("http://localhost:3000/events/upload", {
            method: "POST",
            body: form,
          });
        }}
      >
        test
      </button> */}
    </AdminLayout>
  );
}
