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
const POINT_RADIUS = 4;

function polarPoint(cx: number, cy: number, radius: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

function buildPointList(
  cx: number,
  cy: number,
  maxRadius: number,
  axisCount: number,
  values?: number[],
) {
  const step = 360 / axisCount;
  return Array.from({ length: axisCount }).map((_, i) => {
    const ratio = values ? values[i] / 100 : 1;
    return polarPoint(cx, cy, maxRadius * ratio, i * step);
  });
}

function pointsToString(points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
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

  const pointsA = buildPointList(
    cx,
    cy,
    maxRadius,
    axes.length,
    seriesA.values,
  );
  const pointsB = buildPointList(
    cx,
    cy,
    maxRadius,
    axes.length,
    seriesB.values,
  );

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
              points={pointsToString(
                buildPointList(cx, cy, maxRadius * ratio, axes.length),
              )}
              fill="none"
              stroke="#EADFD3"
            />
          ))}
        </g>

        {/* 나(seriesA)를 선+채우기+원까지 통째로 먼저 그리고,
            상대방(seriesB)을 선+채우기+원까지 통째로 나중에 그린다.
            이렇게 하면 상대방 영역(채우기)이 내 원 위를 지나가면서
            겹치는 부분의 내 원이 상대방 색으로 덮여 보이게 된다.
            선+원은 하나의 <g>로 묶어서 완전히 같은 타이밍으로 커지게 한다. */}
        <g className="taste-radar-chart__series taste-radar-chart__series--mine">
          <polygon
            className="taste-radar-chart__line"
            points={pointsToString(pointsA)}
            fill="none"
            stroke={seriesA.color}
            strokeWidth={2}
          />
          <polygon
            className="taste-radar-chart__fill taste-radar-chart__fill--mine"
            points={pointsToString(pointsA)}
            fill={seriesA.color}
            fillOpacity={seriesA.fillOpacity}
            stroke="none"
          />
          <g className="taste-radar-chart__points">
            {pointsA.map((p, i) => (
              <circle
                key={`mine-${i}`}
                cx={p.x}
                cy={p.y}
                r={POINT_RADIUS}
                fill="#fff"
                stroke={seriesA.color}
                strokeWidth={2}
              />
            ))}
          </g>
        </g>

        <g className="taste-radar-chart__series taste-radar-chart__series--friend">
          <polygon
            className="taste-radar-chart__line"
            points={pointsToString(pointsB)}
            fill="none"
            stroke={seriesB.color}
            strokeWidth={2}
          />
          <polygon
            className="taste-radar-chart__fill taste-radar-chart__fill--friend"
            points={pointsToString(pointsB)}
            fill={seriesB.color}
            fillOpacity={seriesB.fillOpacity}
            stroke="none"
          />
          <g className="taste-radar-chart__points">
            {pointsB.map((p, i) => (
              <circle
                key={`friend-${i}`}
                cx={p.x}
                cy={p.y}
                r={POINT_RADIUS}
                fill="#fff"
                stroke={seriesB.color}
                strokeWidth={2}
              />
            ))}
          </g>
        </g>
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
