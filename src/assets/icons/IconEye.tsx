import { FC, SVGProps } from "react";

interface EyeIconComplexProps extends SVGProps<SVGSVGElement> {}

const EyeIconComplex: FC<EyeIconComplexProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      id="eye"
      viewBox="0 0 1792 1792"
      {...props}
    >
      <path d="m555 1335 78-141q-87-63-136-159t-49-203q0-121 61-225-229 117-381 353 167 258 427 375zm389-759q0-20-14-34t-34-14q-125 0-214.5 89.5T592 832q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm363-191q0 7-1 9-105 188-315 566t-316 567l-49 89q-10 16-28 16-12 0-134-70-16-10-16-28 0-12 44-87-143-65-263.5-173T20 1029Q0 998 0 960t20-69q153-235 380-371t496-136q89 0 180 17l54-97q10-16 28-16 5 0 18 6t31 15.5 33 18.5 31.5 18.5T1291 358q16 10 16 27zm37 447q0 139-79 253.5T1056 1250l280-502q8 45 8 84zm448 128q0 35-20 69-39 64-109 145-150 172-347.5 267T896 1536l74-132q212-18 392.5-137T1664 960q-115-179-282-294l63-112q95 64 182.5 153T1772 891q20 34 20 69z"></path>
    </svg>
  );
};

export default EyeIconComplex;
