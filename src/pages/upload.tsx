import { useRef, useState } from "react";
import { NoData } from "../components/noData";
import AdminLayout from "../layout/admin";
import Dropzone from "react-dropzone";

export default function Upload() {
  const file = useRef(new Blob());
  return (
    <AdminLayout>
      <Dropzone noClick onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="relative border-2 border-dashed">
              <input {...getInputProps()} />
                <NoData />
            </div>
          </section>
        )}
      </Dropzone>
      <input type="file" onChange={(event:any) => {
        console.log(event);
        file.current = event.target.files[0];
      }}/>
      <button onClick={async () => {
        let form = new FormData();
        form.append("file", file.current);
        await fetch("http://localhost:3000/events/upload", {
          method: "POST",
          body: form,
        });
      }}>
        test
      </button>
    </AdminLayout>
  );
}
