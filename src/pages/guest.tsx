import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { VITE_API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  const [docTypes, setDocTypes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const submit = () => {
    if (loading) return;
    const values = getValues();
    if (values.docType === "") return;
    console.log(values);
    setLoading(true);
    fetch(`${VITE_API_URL}/person`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
          window.location.href = "/entry";
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch(`${VITE_API_URL}/person/typedocuments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
      {/* back button */}
      <div className="bg-gray-500 p-2 px-4 border rounded-md absolute top-0 left-0 m-4">
        <button onClick={(e) => {
          e.preventDefault();
          navigate("/entry")
        }} className="text-white">
          Volver
        </button>
      </div>
      <div className="w-96 mx-auto mt-20">
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
              Campo requerido
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
              Campo requerido
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
              Campo requerido
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
              Campo requerido
            </small>
          )}
          <br />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#01AE00] p-4 border rounded-md text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
