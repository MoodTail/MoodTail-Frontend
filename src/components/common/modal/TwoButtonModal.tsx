import '../../../styles/TwoButtonModal.css'

type TwoButtonModalButtonVariant = 'primary' | 'secondary'

interface TwoButtonModalButton {
  label: string
  onClick: () => void
  variant?: TwoButtonModalButtonVariant
}

interface TwoButtonModalProps {
  isOpen: boolean
  title: string
  description?: string
  leftButton: TwoButtonModalButton
  rightButton: TwoButtonModalButton
  onOverlayClick?: () => void
}

function TwoButtonModal({
  isOpen,
  title,
  description,
  leftButton,
  rightButton,
  onOverlayClick,
}: TwoButtonModalProps) {
  if (!isOpen) return null

  return (
    <div className="two-button-modal-overlay" onClick={onOverlayClick}>
      <div
        className="two-button-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="two-button-modal__title">{title}</p>
        {description && (
          <p className="two-button-modal__description">
            {description.split('\n').map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
        <div className="two-button-modal__buttons">
          <button
            type="button"
            className={`two-button-modal__button two-button-modal__button--${leftButton.variant ?? 'primary'}`}
            onClick={leftButton.onClick}
          >
            {leftButton.label}
          </button>
          <button
            type="button"
            className={`two-button-modal__button two-button-modal__button--${rightButton.variant ?? 'primary'}`}
            onClick={rightButton.onClick}
          >
            {rightButton.label}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TwoButtonModal
export type { TwoButtonModalButton, TwoButtonModalProps }
