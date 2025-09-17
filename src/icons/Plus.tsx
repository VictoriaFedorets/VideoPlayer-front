import React from "react";

interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function PlusIcon({ size = 24, className }: PlusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 1024 1024"
      className={className}
    >
      <path
        fill="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={85.3333}
        stroke="currentColor"
        d="M512 213.333v597.333"
      />
      <path
        fill="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={85.3333}
        stroke="currentColor"
        d="M213.333 512h597.333"
      />
    </svg>
  );
}
