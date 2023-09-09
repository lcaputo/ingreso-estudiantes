import { UploadsQueue } from "../components/UploadsQueue";
import Select from "react-select";

export function Test() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <UploadsQueue />
      <br />
      <Select
        options={options}
        isMulti={true}
        isClearable={false}
        styles={{
          control: () => ({
            display: 'flex',
          }),
          option: () => ({
            paddingInline: 10,
            paddingBlock: 5,
          }),
          multiValue: () => ({
            display: 'flex',
            marginRight: 5,
          }),
          multiValueLabel: () => ({
            paddingInline: 5,
            paddingBlock: 2,
          }),
          multiValueRemove: () => ({
            paddingInline: 5,
            paddingBlock: 2,
          }),
        }}
        classNames={{
          control: (state) =>
            "mx-auto w-96 hover:cursor-pointer border border-gray-300 rounded-md focus-within:border-primary",
          container: (state) => "w-96 mx-auto",
          option: (state) => `${state.isSelected ? "bg-primary text-white" : ''} hover:bg-gray-300`,
          multiValue: (state) => "bg-primary text-white",
          multiValueLabel: (state) => 'bg-primary text-white',
          multiValueRemove: (state) => 'hover:bg-gray-200 hover:text-primary transition-color duration-500',
        }}
      />
    </>
  );
}
