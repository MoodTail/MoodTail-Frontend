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

// Figma 기준값: 제목-본문 간격, 본문-버튼 간격 (모달마다 미세하게 다르지만 공용 컴포넌트라 하나로 통일)
const TITLE_TO_DESCRIPTION_GAP = 13
const DESCRIPTION_TO_BUTTONS_GAP = 14

function TwoButtonModal({
  isOpen,
  title,
  description,
  leftButton,
  rightButton,
  onOverlayClick,
}: TwoButtonModalProps) {
  if (!isOpen) return null

  const descriptionLines = description ? description.split('\n') : []

  return (
    <div className="two-button-modal-overlay" onClick={onOverlayClick}>
      <div
        className="two-button-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="two-button-modal__title">
          {title.split('\n').map((line, index, lines) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
        {description && (
          <p className="two-button-modal__description">
            {descriptionLines.map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
        <div
          className="two-button-modal__buttons"
          style={{
            marginTop: description
              ? DESCRIPTION_TO_BUTTONS_GAP
              : TITLE_TO_DESCRIPTION_GAP + DESCRIPTION_TO_BUTTONS_GAP,
          }}
        >
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
