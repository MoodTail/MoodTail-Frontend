import './SaveCompleteModal.css'

interface SaveCompleteModalProps {
  title: string
  onClose: () => void
}

function SaveCompleteModal({ title, onClose }: SaveCompleteModalProps) {
  return (
    <div className="save-complete-modal-overlay">
      <div
        className="save-complete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-complete-modal-title"
      >
        <p id="save-complete-modal-title" className="save-complete-modal__title">
          {title}
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
