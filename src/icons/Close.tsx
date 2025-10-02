import React from "react";

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function CloseIcon({ size = 20, className }: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 20 20"
      className={className}
    >
      <path d="M10 8.586l-7.071-7.071-1.414 1.414 7.071 7.071-7.071 7.071 1.414 1.414 7.071-7.071 7.071 7.071 1.414-1.414-7.071-7.071 7.071-7.071-1.414-1.414-7.071 7.071z"></path>
    </svg>
  );
}
