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

/**
 * 페이지 배경에 들어가는 원형 그라데이션 블러.
 * ⚠️ 반드시 부모 컴포넌트에서 가장 첫 번째 자식으로 렌더링해야 합니다.
 *   (z-index를 따로 안 써도 DOM 순서상 자연스럽게 맨 뒤에 깔립니다.)
 */
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
