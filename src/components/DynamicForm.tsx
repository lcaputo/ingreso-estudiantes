import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MultiSelect } from "./MultiSelect";
import { VITE_API_URL } from "../config";

// interface Headers {
//   key: string;
//   label: string;
//   type?: string;
//   options?: Roles[];
// }

interface Props {
  headers: any;
  submitRef: any;
  fetchPetition: () => void;
  toggleModal: () => void;
  enpoint?: string;
}

export function DynamicForm(props: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const headers = props.headers;

  const submit = async () => {
    const res = await fetch(`${VITE_API_URL}/${props.enpoint!}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getValues()),
      credentials: "include",
    });
    console.log(res);
    if (res) {
      toast.success("creado");
      props.toggleModal();
    } else {
      toast.error("error");
    }
  };

  return (
    <form
      ref={props.submitRef}
      onSubmit={handleSubmit(submit)}
      autoComplete="off"
    >
      {headers.map((header: any, index: number) => {
        return (
          <div className="mb-2" key={header.key + "-" + index}>
            {header.type === "dropdown" ? (
              <>
                <label
                  htmlFor={header.key}
                  className="block text-sm font-medium text-dark"
                >
                  {header.label}
                </label>
                <MultiSelect />
                {errors[header.key] && (
                  <small className="text-warning font-semibold">
                    This field is required
                  </small>
                )}
              </>
            ) : (
              <>
                <Label htmlFor={header.key} value={header.label} />
                <div className="mb-2">
                  <TextInput
                    type={header.type}
                    id={header.key}
                    sizing="sm"
                    className={
                      errors[header.key] && "border border-red-600 rounded-lg "
                    }
                    {...register(header.key, {
                      required: true,
                    })}
                    autoComplete={
                      header.type === "password" ? "new-password" : "off"
                    }
                  />
                  {errors[header.key] && (
                    <small className="text-warning font-semibold">
                      This field is required
                    </small>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}
    </form>
  );
}
