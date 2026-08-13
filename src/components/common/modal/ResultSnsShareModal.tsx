import { useState } from 'react'
import copyIcon from '../../../assets/icons/copy.svg'
import kakaoIcon from '../../../assets/icons/kakao.svg'
import closeIcon from '../../../assets/icons/close-gray.svg'
import { shareToKakao, type KakaoShareOptions } from '../../../utils/kakaoShare'
import '../../../styles/ResultSnsShareModal.css'

interface ResultSnsShareModalProps {
  isOpen: boolean
  url: string
  onClose: () => void
  onKakaoShare?: () => void
  kakaoShare?: KakaoShareOptions
}

function ResultSnsShareModal({ isOpen, url, onClose, onKakaoShare, kakaoShare }: ResultSnsShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    if (!url) return
    // TODO: 클립보드 API 미지원 환경(구형 브라우저 등) 폴백 처리 필요 시 추가
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleKakaoShare = () => {
    try {
      if (!url) return
      if (kakaoShare) shareToKakao(kakaoShare)
      else onKakaoShare?.()
    } catch (error) {
      console.error('카카오톡 공유를 시작하지 못했습니다.', error)
    }
  }

  return (
    <div className="result-sns-share-modal-overlay" onClick={onClose}>
      <div
        className="result-sns-share-modal"
        role="dialog"
        aria-modal="true"
        aria-label="SNS 공유하기"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="result-sns-share-modal__close" onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <button type="button" className="result-sns-share-modal__copy-button" onClick={handleCopy}>
          <span>{copied ? '복사됨' : 'URL 복사하기'}</span>
          <img src={copyIcon} alt="" aria-hidden="true" />
        </button>

        <button type="button" className="result-sns-share-modal__kakao-button" onClick={handleKakaoShare}>
          <span>카카오톡으로 공유하기</span>
          <img src={kakaoIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default ResultSnsShareModal
export type { ResultSnsShareModalProps }
