import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const IconCheckin = (props: IconProps) => {
  return (
    <svg
      className="w-6 h-6 text-primary"
      xmlns="http://www.w3.org/2000/svg"
      id="check"
      viewBox="0 0 1792 1792"
      fill="currentColor"
      {...props}
    >
      <path d="M1472 930v318q0 119-84.5 203.5T1184 1536H352q-119 0-203.5-84.5T64 1248V416q0-119 84.5-203.5T352 128h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6H352q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113V994q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489-814 814q-24 24-57 24t-57-24L345 825q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z"></path>
    </svg>
  );
};

export default IconCheckin;
