import { Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { CreateUser } from "../services/user";
import toast from "react-hot-toast";
import { MultiSelect } from "./MultiSelect";

// interface Headers {
//   key: string;
//   label: string;
//   type?: string;
//   options?: Roles[];
// }

interface Props {
  headers: any;
  submitRef: any;
  toggleModal: () => void;
}

export function DynamicForm(props: Props) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const headers = props.headers;

  const submit = async () => {
    const res = await CreateUser(getValues());
    console.log(res);
    if (res.statusCode === 200 || res.statusCode === 201) {
      toast.success(res.message);
      props.toggleModal();
    } else {
      toast.error(res.message);
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
                  className="block text-sm font-medium text-dark dark:text-white"
                >
                  {header.label}
                </label>
                {/* <Select
              multiple={true}
              placeholder="Select a country"
              id="countries"
              sizing="sm"
              className={
                errors[header.key] && "border border-red-600 rounded-lg "
              }
              {...register(header.key, {
                required: "select one option",
              })}
            >
              {header.options.map((option: Roles) => {
                return <option  value={option.value}>{option.label}</option>;
              })}
            </Select> */}
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
