import { useEffect, useRef } from 'react'
import '../../styles/NicknameEditOverlay.css'

interface NicknameEditOverlayProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

function NicknameEditOverlay({ value, onChange, onClose }: NicknameEditOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClose()
    }
  }

  return (
    <div className="nickname-edit-overlay" onClick={onClose}>
      <div className="nickname-edit-overlay__field" onClick={(event) => event.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          className="nickname-edit-overlay__input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="닉네임을 입력해주세요"
        />
        {value && (
          <button
            type="button"
            className="nickname-edit-overlay__clear"
            onClick={() => onChange('')}
            aria-label="닉네임 지우기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default NicknameEditOverlay
export type { NicknameEditOverlayProps }
