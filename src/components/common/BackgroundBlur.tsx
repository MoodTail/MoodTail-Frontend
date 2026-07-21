import type { FC } from "react";

interface BlurCircle {
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity: number;
}

interface BackgroundBlurProps {
  width: number;
  height: number;
  circles: BlurCircle[];
  top?: number;
  left?: number;
  idPrefix: string;
}

const BackgroundBlur: FC<BackgroundBlurProps> = ({
  width,
  height,
  circles,
  top = 0,
  left = 0,
  idPrefix,
}) => {
  return (
    <svg
      className="background-blur"
      style={{
        position: "absolute",
        left,
        top,
        zIndex: -1,
        pointerEvents: "none",
      }}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill={`url(#${idPrefix}-${i})`}
          fillOpacity={c.opacity}
        />
      ))}
      <defs>
        {circles.map((c, i) => (
          <radialGradient
            key={i}
            id={`${idPrefix}-${i}`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${c.cx} ${c.cy}) rotate(90) scale(${c.r})`}
          >
            <stop stopColor={c.color} />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
};

export default BackgroundBlur;
