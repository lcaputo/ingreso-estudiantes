import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}

const IconRecords = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-history text-primary"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 8l0 4l2 2"></path>
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
    </svg>
  );
};

export default IconRecords;
