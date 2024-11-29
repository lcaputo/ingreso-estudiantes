import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MultiSelect } from "./MultiSelect";
import { VITE_API_URL } from "../config";
import Select from "react-select";

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
  dataSet?: any;
}

export function DynamicForm(props: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const headers = props.headers;

  const options = [
    { value: 1, label: "administrador" },
    { value: 2, label: "auditor" },
    { value: 3, label: "puesto de servicio" },
  ];

  const handleSelectChange = (selectedOption: any, key: any) => {
    console.log(selectedOption);
    console.log(key);
    selectedOption = selectedOption.map((option: any) => option.value);

    setValue(key, selectedOption, { shouldValidate: true }); // Establece el valor seleccionado en el formulario
  };


  const submit = () => {
    fetch(`${VITE_API_URL}/${props.enpoint!}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(getValues()),
    }).then((res) => {
      if (res.ok) {
        fetch(`${VITE_API_URL}/${props.enpoint!}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }).then((res) => {
          if (res.ok) {
            props.fetchPetition();
            props.toggleModal();
            toast.success("Success");
            return res.json();
          }
          if (res.status  != 200 && res.status  != 201) {
            toast.error("error");
          }
        }).then((data:any) => {
          props.dataSet = data.data;
        })
        props.toggleModal();
        toast.success("Success");
      }
      if (res.status  != 200 && res.status  != 201) {
        toast.error("error");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("error");
    })
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
                <Select
                  onChange={(selectedOption) => handleSelectChange(selectedOption, header.name)}
                  required={true}
                  id={header.key}
                  options={options}
                  isMulti={true}
                  isClearable={false}
                  placeholder=""
                  styles={{
                    control: () => ({
                      display: "flex",
                      height: "34px",
                    }),
                    option: () => ({
                      paddingInline: 5,
                      paddingBlock: 2,
                    }),
                    valueContainer: () => ({
                      display: "flex",
                      flexWrap: "wrap",
                      flex: 1,
                      alignItems: "center",
                      alignContent: "center",
                      paddingInline: 5,
                      paddingBlock: 2,
                    }),
                    multiValue: () => ({
                      display: "flex",
                      marginRight: 5,
                    }),
                    multiValueLabel: () => ({
                      marginInline: 5,
                      paddingBlock: 2,
                    }),
                    multiValueRemove: () => ({
                      display: "flex",
                      alignItems: "center",
                      marginRight: 5,
                      height: "fit-content",
                      marginBlock: "auto",
                    }),
                  }}
                  classNames={{
                    control: (state) =>
                      "mx-auto hover:cursor-pointer border border-gray-300 rounded-md focus-within:border-primary bg-gray-50",
                    option: (state) =>
                      `${
                        state.isSelected ? "bg-primary text-white" : ""
                      } hover:bg-gray-300`,
                    multiValue: (state) =>
                      "bg-primary text-white align-middle rounded-sm",
                    multiValueLabel: (state) =>
                      "bg-primary text-white text-sm flex items-center",
                    multiValueRemove: (state) =>
                      "rounded-sm hover:bg-gray-200 hover:text-gray-600 transition-color duration-500",
                  }}
                />
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
