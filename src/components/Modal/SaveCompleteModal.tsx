import './SaveCompleteModal.css'

interface SaveCompleteModalProps {
  title: string
  onClose: () => void
  titleLines?: string[]
}

function SaveCompleteModal({
  title,
  onClose,
  titleLines,
}: SaveCompleteModalProps) {
  return (
    <div className="save-complete-modal-overlay">
      <div
        className={`save-complete-modal${titleLines ? ' save-complete-modal--compact' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-complete-modal-title"
      >
        <p
          id="save-complete-modal-title"
          className={`save-complete-modal__title${titleLines ? ' save-complete-modal__title--compact' : ''}`}
        >
          {titleLines
            ? titleLines.map((line) => <span key={line}>{line}</span>)
            : title}
        </p>

        <button type="button" className="save-complete-modal__close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default SaveCompleteModal
export type { SaveCompleteModalProps }
