import React from "react";

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function EyeHiddenIcon({ size = 32, className }: PlayIconProps) {
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
      <path d="M5.307 10.964a13.9 13.9 0 0 0-2.702 4.937L2.579 16C4.302 21.784 9.659 26 16 26c1.324 0 2.604-.184 3.817-.527M8.304 8.304A13.804 13.804 0 0 1 15.978 6h.023H16c6.341 0 11.697 4.216 13.42 9.997-.985 3.228-3.008 5.891-5.673 7.666l-.051.032M8.304 8.304 4 4m4.304 4.304 4.867 4.867m10.525 10.525L28 28m-4.304-4.304-4.867-4.867a4 4 0 1 0-5.656-5.658l-.001.001m5.657 5.656-5.655-5.655" />
    </svg>
  );
}
