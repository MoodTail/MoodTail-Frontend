import type { FC } from "react";
import "../../styles/TasteRadarChart.css";

interface RadarSeries {
  label: string;
  color: string;
  fillOpacity: number;
  values: number[]; // 0~100, axes 순서와 매칭
}

interface TasteRadarChartProps {
  axes: string[];
  seriesA: RadarSeries; // 나
  seriesB: RadarSeries; // 상대
  size?: number;
  labelOffsets?: number[]; // 축별로 maxRadius에 더해지는 라벨 여백
}

const GRID_RINGS = [0.25, 0.5, 0.75, 1];
const DEFAULT_LABEL_OFFSETS = [21, 27, 25, 25, 27]; // 도수,청량,쓴맛,산도,당도

function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function buildPoints(
  cx: number,
  cy: number,
  maxRadius: number,
  axisCount: number,
  values?: number[],
) {
  const step = 360 / axisCount;
  return Array.from({ length: axisCount })
    .map((_, i) => {
      const ratio = values ? values[i] / 100 : 1;
      const p = polarPoint(cx, cy, maxRadius * ratio, i * step);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

const TasteRadarChart: FC<TasteRadarChartProps> = ({
  axes,
  seriesA,
  seriesB,
  size = 224,
  labelOffsets = DEFAULT_LABEL_OFFSETS,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 4;

  return (
    <div className="taste-radar-chart" style={{ width: size, height: size }}>
      <svg
        className="taste-radar-chart__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <g className="taste-radar-chart__grid">
          {GRID_RINGS.map((ratio) => (
            <polygon
              key={ratio}
              points={buildPoints(cx, cy, maxRadius * ratio, axes.length)}
              fill="none"
              stroke="#EADFD3"
            />
          ))}
        </g>

        <polygon
          className="taste-radar-chart__line taste-radar-chart__line--friend"
          points={buildPoints(cx, cy, maxRadius, axes.length, seriesB.values)}
          fill="none"
          stroke={seriesB.color}
          strokeWidth={2}
        />
        <polygon
          className="taste-radar-chart__fill taste-radar-chart__fill--friend"
          points={buildPoints(cx, cy, maxRadius, axes.length, seriesB.values)}
          fill={seriesB.color}
          fillOpacity={seriesB.fillOpacity}
          stroke="none"
        />

        <polygon
          className="taste-radar-chart__line taste-radar-chart__line--mine"
          points={buildPoints(cx, cy, maxRadius, axes.length, seriesA.values)}
          fill="none"
          stroke={seriesA.color}
          strokeWidth={2}
        />
        <polygon
          className="taste-radar-chart__fill taste-radar-chart__fill--mine"
          points={buildPoints(cx, cy, maxRadius, axes.length, seriesA.values)}
          fill={seriesA.color}
          fillOpacity={seriesA.fillOpacity}
          stroke="none"
        />
      </svg>

      {axes.map((label, i) => {
        const radius = maxRadius + (labelOffsets[i] ?? 16);
        const p = polarPoint(cx, cy, radius, i * (360 / axes.length));
        return (
          <span
            key={label}
            className="taste-radar-chart__axis-label"
            style={{ left: p.x, top: p.y }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

export default TasteRadarChart;
