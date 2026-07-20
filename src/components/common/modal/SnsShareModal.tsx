import { useState } from 'react'
import copyIcon from '../../../assets/icons/copy.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'
import closeIcon from '../../../assets/icons/close-gray.svg'
import '../../../styles/SnsShareModal.css'

interface SnsShareModalProps {
  isOpen: boolean
  url: string
  onClose: () => void
  onKakaoShare: () => void
}

function SnsShareModal({ isOpen, url, onClose, onKakaoShare }: SnsShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    // TODO: 클립보드 API 미지원 환경(구형 브라우저 등) 폴백 처리 필요 시 추가
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="sns-share-modal-overlay" onClick={onClose}>
      <div
        className="sns-share-modal"
        role="dialog"
        aria-modal="true"
        aria-label="SNS 공유하기"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="sns-share-modal__close" onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <p className="sns-share-modal__tip">TIP: 캐릭터는 무료 12종이나 된답니다! 전부 해금할 수 있을까요?</p>

        <button type="button" className="sns-share-modal__copy-button" onClick={handleCopy}>
          <span>{copied ? '복사됨' : 'URL 복사하기'}</span>
          <img src={copyIcon} alt="" aria-hidden="true" />
        </button>

        <button type="button" className="sns-share-modal__kakao-button" onClick={onKakaoShare}>
          <span>카카오톡으로 공유하기</span>
          <img src={kakaoIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default SnsShareModal
export type { SnsShareModalProps }
