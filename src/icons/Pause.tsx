import React from "react";

interface PauseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const PauseIcon: React.FC<PauseIconProps> = ({ size = 24, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
    >
      <path d="M64 64h160v384h-160zM288 64h160v384h-160z"></path>
    </svg>
  );
};

export default PauseIcon;
