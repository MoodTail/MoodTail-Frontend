import { useRef } from 'react'
import { toPng } from 'html-to-image'
import ShareCard, { type ShareCardProps } from '../ShareCard'
import closeIcon from '../../../assets/icons/close.svg'
import '../../../styles/ShareResultModal.css'

interface ShareResultModalProps {
  isOpen: boolean
  shareCard: ShareCardProps
  onClose: () => void
  onSnsShare: () => void
  onImageSaved: () => void
}

function ShareResultModal({
  isOpen,
  shareCard,
  onClose,
  onSnsShare,
  onImageSaved,
}: ShareResultModalProps) {
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
    <div className="share-result-modal-overlay" onClick={onClose}>
      <div
        className="share-result-modal"
        role="dialog"
        aria-modal="true"
        aria-label="결과 공유"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="share-result-modal__close" onClick={onClose} aria-label="닫기">
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <div ref={cardRef}>
          <ShareCard {...shareCard} />
        </div>

        <div className="share-result-modal__buttons">
          <button type="button" className="share-result-modal__button share-result-modal__button--primary" onClick={onSnsShare}>
            SNS 공유하기
          </button>
          <button
            type="button"
            className="share-result-modal__button share-result-modal__button--secondary"
            onClick={handleSaveImage}
          >
            이미지 저장
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareResultModal
export type { ShareResultModalProps }
