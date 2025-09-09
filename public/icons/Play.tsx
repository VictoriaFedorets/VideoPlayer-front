import React from "react";

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function PlayIcon({ size = 24, className }: PlayIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 512 512"
      className={className}
    >
      <path d="M96 64l320 192-320 192z" />
    </svg>
  );
}
