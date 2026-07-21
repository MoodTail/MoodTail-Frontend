import { useRef } from 'react'
import { toPng } from 'html-to-image'
import ResultShareCard, { type ResultShareCardProps } from '../ResultShareCard'
import closeIcon from '../../../assets/icons/close.svg'
import '../../../styles/ResultShareModal.css'

interface ResultShareModalProps {
  isOpen: boolean
  shareCard: ResultShareCardProps
  onClose: () => void
  onSnsShare: () => void
  onImageSaved: () => void
}

function ResultShareModal({
  isOpen,
  shareCard,
  onClose,
  onSnsShare,
  onImageSaved,
}: ResultShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  const handleSaveImage = async () => {
    if (!cardRef.current) return
    // TODO: 지금은 웹 다운로드 방식. 실제 처리 방식(앱 내 저장 등) 확정되면 교체
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 })
    const link = document.createElement('a')
    link.download = `moodtail-${shareCard.typeName}.png`
    link.href = dataUrl
    link.click()
    onImageSaved()
  }

  return (
    <div className="result-share-modal-overlay" onClick={onClose}>
      <div
        className="result-share-modal"
        role="dialog"
        aria-modal="true"
        aria-label="결과 공유"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="result-share-modal__close" onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <div ref={cardRef}>
          <ResultShareCard {...shareCard} />
        </div>

        <div className="result-share-modal__buttons">
          <button type="button" className="result-share-modal__button result-share-modal__button--primary" onClick={onSnsShare}>
            SNS 공유하기
          </button>
          <button
            type="button"
            className="result-share-modal__button result-share-modal__button--secondary"
            onClick={handleSaveImage}
          >
            이미지 저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultShareModal
export type { ResultShareModalProps }
