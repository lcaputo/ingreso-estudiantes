import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {}
const IconHistory = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#06B6D4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-history"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8l0 4l2 2" />
      <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
    </svg>
  );
};

export default IconHistory;
