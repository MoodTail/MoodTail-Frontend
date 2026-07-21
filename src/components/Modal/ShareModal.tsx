import { useState } from 'react'
import './ShareModal.css'

interface ShareModalProps {
  onClose: () => void
  shareUrl: string
  tipText?: string
  onKakaoShare?: () => void
}

function ShareModal({ onClose, shareUrl, tipText, onKakaoShare }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div
        className="share-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="share-modal__close"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#close-icon"></use>
          </svg>
        </button>

        {tipText && <p className="share-modal__tip">{tipText}</p>}

        <button type="button" className="share-modal__url" onClick={handleCopy}>
          <span>{copied ? '복사되었습니다' : 'URL 복사하기'}</span>
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#copy-icon"></use>
          </svg>
        </button>

        <button type="button" className="share-modal__kakao" onClick={onKakaoShare}>
          <span>카카오톡으로 공유하기</span>
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#kakao-icon"></use>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ShareModal
export type { ShareModalProps }
