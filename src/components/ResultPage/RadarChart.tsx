import '../../styles/RadarChart.css'

interface RadarChartData {
  당도: number
  산도: number
  쓴맛: number
  청량감: number
  도수: number
}

interface RadarChartProps {
  myData: RadarChartData
  compareData?: RadarChartData
  maxValue?: number
}

const AXES: { key: keyof RadarChartData; label: string; angle: number }[] = [
  { key: '당도', label: '당도', angle: -90 },
  { key: '산도', label: '산도', angle: -18 },
  { key: '쓴맛', label: '쓴맛', angle: 54 },
  { key: '도수', label: '도수', angle: 126 },
  { key: '청량감', label: '청량감', angle: 198 },
]

const SIZE = 280
const CENTER = SIZE / 2
const MAX_RADIUS = 92
const GRID_STEPS = [0.25, 0.5, 0.75, 1]

function pointAt(angleDeg: number, radius: number) {
  const angleRad = (Math.PI / 180) * angleDeg
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  }
}

function toPolygonString(points: { x: number; y: number }[]) {
  return points.map((point) => `${point.x},${point.y}`).join(' ')
}

function gridPolygonPoints(radius: number) {
  return AXES.map((axis) => pointAt(axis.angle, radius))
}

function dataPolygonPoints(data: RadarChartData, maxValue: number) {
  return AXES.map((axis) => pointAt(axis.angle, (data[axis.key] / maxValue) * MAX_RADIUS))
}

function labelPosition(angle: number) {
  const point = pointAt(angle, MAX_RADIUS + 24)
  const cos = Math.cos((Math.PI / 180) * angle)
  const anchor: 'start' | 'middle' | 'end' = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle'
  return { ...point, anchor }
}

function RadarChart({ myData, compareData, maxValue = 100 }: RadarChartProps) {
  const myPoints = dataPolygonPoints(myData, maxValue)
  const comparePoints = compareData ? dataPolygonPoints(compareData, maxValue) : null

  return (
    <svg
      className="radar-chart"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="취향 분석 레이더 차트"
    >
      {GRID_STEPS.map((step) => (
        <polygon
          key={step}
          className="radar-chart__grid"
          points={toPolygonString(gridPolygonPoints(MAX_RADIUS * step))}
        />
      ))}

      {AXES.map((axis) => {
        const outer = pointAt(axis.angle, MAX_RADIUS)
        return (
          <line
            key={axis.key}
            className="radar-chart__axis"
            x1={CENTER}
            y1={CENTER}
            x2={outer.x}
            y2={outer.y}
          />
        )
      })}

      {comparePoints && (
        <polygon
          className="radar-chart__polygon radar-chart__polygon--compare"
          points={toPolygonString(comparePoints)}
        />
      )}

      <polygon
        className="radar-chart__polygon radar-chart__polygon--primary"
        points={toPolygonString(myPoints)}
      />

      {comparePoints &&
        comparePoints.map((point, index) => (
          <circle
            key={AXES[index].key}
            className="radar-chart__dot radar-chart__dot--compare"
            cx={point.x}
            cy={point.y}
            r={4}
          />
        ))}

      {myPoints.map((point, index) => (
        <circle
          key={AXES[index].key}
          className="radar-chart__dot radar-chart__dot--primary"
          cx={point.x}
          cy={point.y}
          r={5}
        />
      ))}

      {AXES.map((axis) => {
        const label = labelPosition(axis.angle)
        return (
          <text
            key={axis.key}
            className="radar-chart__label"
            x={label.x}
            y={label.y}
            textAnchor={label.anchor}
            dominantBaseline="middle"
          >
            {axis.label}
          </text>
        )
      })}
    </svg>
  )
}

export default RadarChart
export type { RadarChartData, RadarChartProps }
