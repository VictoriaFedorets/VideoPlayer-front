import React from "react";

interface PauseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const PauseIcon: React.FC<PauseIconProps> = ({ size = 512, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
    >
      <path d="M512 0h-208l80 80-96 96 48 48 96-96 80 80z"></path>
      <path d="M512 512v-208l-80 80-96-96-48 48 96 96-80 80z"></path>
      <path d="M0 512h208l-80-80 96-96-48-48-96 96-80-80z"></path>
      <path d="M0 0v208l80-80 96 96 48-48-96-96 80-80z"></path>
    </svg>
  );
};

export default PauseIcon;
