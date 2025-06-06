import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

export default function SquircleLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Squircle
        size="32"
        stroke="5"
        strokeLength="0.2"
        bgOpacity="0.5"
        speed="0.9"
        color="var(--primary)"
      />
    </div>
  );
}
