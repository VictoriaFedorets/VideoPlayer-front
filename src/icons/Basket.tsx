import React from "react";

interface BasketIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function BasketIcon({ size = 32, className }: BasketIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={2.6667}
        d="M4 8h24"
      />
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={2.6667}
        d="M25.333 8v18.667c0 0.707-0.281 1.386-0.781 1.886s-1.178 0.781-1.886 0.781h-13.333c-0.707 0-1.386-0.281-1.886-0.781s-0.781-1.178-0.781-1.886v-18.667M10.667 8v-2.667c0-0.707 0.281-1.386 0.781-1.886s1.178-0.781 1.886-0.781h5.333c0.707 0 1.386 0.281 1.886 0.781s0.781 1.178 0.781 1.886v2.667"
      />
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={2.6667}
        d="M13.333 14.667v8"
      />
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={4}
        strokeWidth={2.6667}
        d="M18.667 14.667v8"
      />
    </svg>
  );
}
