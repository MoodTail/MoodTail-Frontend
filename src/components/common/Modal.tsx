import '../../styles/Modal.css'

type ModalButtonVariant = 'primary' | 'secondary'

interface ModalButton {
  label: string
  onClick: () => void
  variant?: ModalButtonVariant
}

interface ModalProps {
  title: string
  description?: string
  buttons: ModalButton[]
  className?: string
}

function Modal({ title, description, buttons, className }: ModalProps) {
  return (
    <div className={`modal-overlay${className ? ` ${className}` : ''}`}>
      <div
        className={`modal${className ? ` ${className}` : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
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
        {buttons.length > 0 && (
          <div className="modal__buttons">
            {buttons.map((button) => (
              <button
                key={button.label}
                type="button"
                className={`modal__button modal__button--${button.variant ?? 'primary'}`}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
export type { ModalButton, ModalProps }
