import Select from "react-select";

export function MultiSelect() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <Select
      options={options}
      isMulti={true}
      isClearable={false}
      placeholder=""
      styles={{
        control: () => ({
          display: "flex",
          height: '34px',
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
          height: 'fit-content',
          marginBlock: 'auto',
        }),
      }}
      classNames={{
        control: (state) =>
          "mx-auto hover:cursor-pointer border border-gray-300 rounded-md focus-within:border-primary bg-gray-50",
        option: (state) =>
          `${
            state.isSelected ? "bg-primary text-white" : ""
          } hover:bg-gray-300`,
        multiValue: (state) => "bg-primary text-white align-middle rounded-sm",
        multiValueLabel: (state) =>
          "bg-primary text-white text-sm flex items-center",
        multiValueRemove: (state) =>
          "rounded-sm hover:bg-gray-200 hover:text-gray-600 transition-color duration-500",
      }}
    />
  );
}
