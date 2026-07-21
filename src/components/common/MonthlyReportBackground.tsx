import './MonthlyReportBackground.css'

type MonthlyReportBackgroundVariant = 'long' | 'short'

interface MonthlyReportBackgroundProps {
  variant: MonthlyReportBackgroundVariant
}

function MonthlyReportBackground({ variant }: MonthlyReportBackgroundProps) {
  return (
    <div
      className={`monthly-report-background monthly-report-background--${variant}`}
      aria-hidden="true"
    >
      <div className="monthly-report-background__glow monthly-report-background__glow--top" />
      <div className="monthly-report-background__glow monthly-report-background__glow--middle" />
    </div>
  )
}

export default MonthlyReportBackground
export type { MonthlyReportBackgroundProps, MonthlyReportBackgroundVariant }
