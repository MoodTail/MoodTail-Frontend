import '../../styles/CompleteModal.css'

type CompleteModalButtonVariant = 'primary' | 'secondary'

interface CompleteModalButton {
  label: string
  onClick: () => void
  variant?: CompleteModalButtonVariant
}

interface CompleteModalProps {
  title: string
  description?: string
  button?: CompleteModalButton
  className?: string
  onOverlayClick?: () => void
}

function CompleteModal({ title, description, button, className, onOverlayClick }: CompleteModalProps) {
  return (
    <div
      className={`modal-overlay${className ? ` ${className}` : ''}`}
      onClick={onOverlayClick}
    >
      <div
        className={`modal${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal__title">{title}</p>
        {description && (
          <p className="modal__description">
            {description.split('\n').map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
        {button && (
          <div className="modal__buttons">
            <button
              type="button"
              className={`modal__button modal__button--${button.variant ?? 'primary'}`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompleteModal
export type { CompleteModalButton, CompleteModalProps }
