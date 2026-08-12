import '../../../styles/TwoButtonModalLeftAligned.css'

type TwoButtonModalButtonVariant = 'primary' | 'secondary'

interface TwoButtonModalButton {
  label: string
  onClick: () => void
  variant?: TwoButtonModalButtonVariant
}

interface TwoButtonModalLeftAlignedProps {
  isOpen: boolean
  title: string
  description?: string
  leftButton: TwoButtonModalButton
  rightButton: TwoButtonModalButton
  onOverlayClick?: () => void
}

// TwoButtonModal.tsx와 UI/구조는 동일하되 제목/본문 텍스트만 왼쪽 정렬입니다.
// 공용 컴포넌트(TwoButtonModal.tsx)는 다른 화면에서도 쓰이므로 그쪽을 고치지 않고,
// 이 정렬이 필요한 화면(LockedCocktailModal)에서만 쓰는 별도 컴포넌트로 분리했습니다.
const TITLE_TO_DESCRIPTION_GAP = 13
const DESCRIPTION_TO_BUTTONS_GAP = 14

function TwoButtonModalLeftAligned({
  isOpen,
  title,
  description,
  leftButton,
  rightButton,
  onOverlayClick,
}: TwoButtonModalLeftAlignedProps) {
  if (!isOpen) return null

  const descriptionLines = description ? description.split('\n') : []

  return (
    <div className="two-button-modal-left-overlay" onClick={onOverlayClick}>
      <div
        className="two-button-modal-left"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <p className="two-button-modal-left__title">
          {title.split('\n').map((line, index, lines) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 && <br />}
            </span>
          ))}
        </p>
        {description && (
          <p className="two-button-modal-left__description">
            {descriptionLines.map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
        <div
          className="two-button-modal-left__buttons"
          style={{
            marginTop: description
              ? DESCRIPTION_TO_BUTTONS_GAP
              : TITLE_TO_DESCRIPTION_GAP + DESCRIPTION_TO_BUTTONS_GAP,
          }}
        >
          <button
            type="button"
            className={`two-button-modal-left__button two-button-modal-left__button--${leftButton.variant ?? 'primary'}`}
            onClick={leftButton.onClick}
          >
            {leftButton.label}
          </button>
          <button
            type="button"
            className={`two-button-modal-left__button two-button-modal-left__button--${rightButton.variant ?? 'primary'}`}
            onClick={rightButton.onClick}
          >
            {rightButton.label}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TwoButtonModalLeftAligned
export type { TwoButtonModalButton, TwoButtonModalLeftAlignedProps }
