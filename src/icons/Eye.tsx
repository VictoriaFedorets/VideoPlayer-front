import React from "react";

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function EyeIcon({ size = 32, className }: PlayIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 32 32"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={className}
    >
      <path d="M2.715 16.429a1.332 1.332 0 0 1 .003-.861l-.003.009C4.564 10.013 9.814 6 16 6c6.184 0 11.431 4.009 13.284 9.571.093.276.093.575 0 .852C27.436 21.987 22.187 26 16 26c-6.184 0-11.432-4.009-13.285-9.571z" />
      <path d="M20 16a4 4 0 0 1-8 0 4 4 0 0 1 8 0z" />{" "}
    </svg>
  );
}
