import './MonthlyReportNoticeModal.css'

interface MonthlyReportNoticeModalProps {
  title: string
  description: string
  primaryButtonLabel: string
  onPrimaryAction: () => void
  onClose: () => void
}

function MonthlyReportNoticeModal({
  title,
  description,
  primaryButtonLabel,
  onPrimaryAction,
  onClose,
}: MonthlyReportNoticeModalProps) {
  return (
    <div className="monthly-report-modal-overlay">
      <div
        className="monthly-report-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="monthly-report-modal-title"
        aria-describedby="monthly-report-modal-description"
      >
        <h2 id="monthly-report-modal-title" className="monthly-report-modal__title">
          {title}
        </h2>

        <p id="monthly-report-modal-description" className="monthly-report-modal__description">
          {description.split('\n').map((line, index) => (
            <span key={line}>
              {line}
              {index < description.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className="monthly-report-modal__actions">
          <button
            type="button"
            className="monthly-report-modal__button monthly-report-modal__button--primary"
            onClick={onPrimaryAction}
          >
            {primaryButtonLabel}
          </button>
          <button
            type="button"
            className="monthly-report-modal__button monthly-report-modal__button--secondary"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthlyReportNoticeModal
export type { MonthlyReportNoticeModalProps }
