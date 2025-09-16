import React from "react";

interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function EditIcon({ size = 20, className }: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 20 20"
      className={className}
    >
      <path d="M12.3 3.7l4 4-12.3 12.3h-4v-4l12.3-12.3zM13.7 2.3l2.3-2.3 4 4-2.3 2.3-4-4z"></path>
      ;
    </svg>
  );
}
