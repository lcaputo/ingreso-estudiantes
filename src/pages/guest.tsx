import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { VITE_API_URL } from "../config";

export default function () {
  const [docTypes, setDocTypes] = useState<any>([]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const submit = () => {
    const values = getValues();
    if (values.docType === "") return;
    console.log(values);
    fetch(`${VITE_API_URL}/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        docType: parseInt(values.docType),
        document: parseInt(values.document),
        personTypes: 5,
      }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Usuario Registrado");
          setTimeout(() => {
            window.location.href = "/entry";
          }, 2000);
          return res.json();
        } else {
          toast.error("Error");
        }
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  useEffect(() => {
    fetch(`${VITE_API_URL}/person/typedocuments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          toast.error("Error");
        }
      })
      .then((res) => {
        console.log(res.data);
        setDocTypes(res.data);
      })
      .catch(() => {
        toast.error("Error");
      });
    return;
  }, []);

  return (
    <>
      <div className="screen">
        <form className="flex flex-col mx-auto" onSubmit={handleSubmit(submit)}>
          <label>Nombres</label>
          <input
          className="w-full border-b-2 border-gray-300 py-2"
            type="text"
            {...register("firstName", {
              required: true,
            })}
          />
          {errors["firstName"] && (
            <small className="text-warning font-semibold">
              This field is required
            </small>
          )}
          <br />
          <label>Apellidos</label>
          <input
          className="w-full border-b-2 border-gray-300 py-2"
            type="text"
            {...register("lastName", {
              required: true,
            })}
          />
          {errors["lastName"] && (
            <small className="text-warning font-semibold">
              This field is required
            </small>
          )}
          <br />
          <label>Tipo de identificación</label>
          <select
          className="w-full border-b-2 border-gray-300 py-2"
            {...register("docType", {
              required: true,
            })}
          >
            <option value="">Selecciona una opcion</option>
            {docTypes.map((docType: any) => {
              return (
                <option key={docType.id} value={docType.id}>
                  {docType.name}
                </option>
              );
            })}
          </select>
          {errors["docType"] && (
            <small className="text-warning font-semibold">
              This field is required
            </small>
          )}
          <br />
          <label>Numero de documento</label>
          <input
          className="w-full border-b-2 border-gray-300 py-2"
          type="number"
            {...register("document", {
              required: true,
            })}
          />
          {errors["document"] && (
            <small className="text-warning font-semibold">
              This field is required
            </small>
          )}
          <br />
          <button type="submit" className="bg-primary py-4 text-white">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
