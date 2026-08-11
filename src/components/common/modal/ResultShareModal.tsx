import { useRef, type CSSProperties } from 'react'
import { toBlob, toPng } from 'html-to-image'
import ResultShareCard, { type ResultShareCardProps } from '../ResultShareCard'
import closeIcon from '../../../assets/icons/close.svg'
import { createMoodTestResultShare } from '../../../api/mood-tests/moodTests.api'
import type { MoodTasteScores } from '../../../api/mood-tests/moodTests.types'
import '../../../styles/ResultShareModal.css'

interface ResultShareModalProps {
  isOpen: boolean
  shareCard: ResultShareCardProps
  // 있으면 "SNS 공유하기" 클릭 시 실제 공유 URL을 생성합니다. 없거나 실패하면 목 URL로 폴백합니다.
  tasteProfile?: MoodTasteScores
  onClose: () => void
  onSnsShare: (shareUrl?: string) => void
  onImageSaved: () => void
}

function ResultShareModal({
  isOpen,
  shareCard,
  tasteProfile,
  onClose,
  onSnsShare,
  onImageSaved,
}: ResultShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const accentColorByType: Record<string, string> = {
    'passionate-challenger': '#FECE3F',
    'free-spirited-romantic': '#FDAF7A',
    'refreshing-explorer': '#FDABAA',
    'explosive-adventurer': '#F8490C',
    'sensitive-perfectionist': '#FB8558',
    'meticulous-critic': '#AC3E10',
    'emotional-thinker': '#346A99',
    'steadfast-principlist': '#124480',
    'grounded-realist': '#1564FE',
    'easygoing-optimist': '#3CD4C1',
    'quiet-supporter': '#21A26A',
    'balanced-mediator': '#6DCC9F',
  }
  const accentColor = shareCard.typeCode ? accentColorByType[shareCard.typeCode] ?? '#ff613d' : '#ff613d'

  if (!isOpen) return null

  const buildResultShareUrl = (shareToken: string) => {
    const baseUrl = import.meta.env.VITE_WEB_BASE_URL?.trim() || window.location.origin
    return new URL(`/share/results/${encodeURIComponent(shareToken)}`, baseUrl).href
  }

  const handleSaveImage = async () => {
    if (!cardRef.current) return
    // TODO: 지금은 웹 다운로드 방식. 실제 처리 방식(앱 내 저장 등) 확정되면 교체
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 2, cacheBust: true })
      if (!blob) throw new Error('이미지 생성에 실패했습니다.')

      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `moodtail-${shareCard.typeName}.png`
      link.href = downloadUrl
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
      onImageSaved()
    } catch (error) {
      console.error('결과 공유 카드 이미지 저장 실패', error)

      try {
        const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true })
        const link = document.createElement('a')
        link.download = `moodtail-${shareCard.typeName}.png`
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        link.remove()
        onImageSaved()
      } catch (fallbackError) {
        console.error('결과 공유 카드 이미지 저장 fallback 실패', fallbackError)
        alert('이미지 저장에 실패했어요. 잠시 후 다시 시도해주세요.')
      }
    }
  }

  const handleSnsShare = async () => {
    if (!cardRef.current || !tasteProfile) {
      alert('공유 링크 생성에 실패했어요. 로그인 상태를 확인한 뒤 다시 시도해주세요.')
      return
    }
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 2, cacheBust: true })
      if (!blob) throw new Error('썸네일 이미지 생성에 실패했습니다')
      const { shareToken } = await createMoodTestResultShare(tasteProfile, blob)
      onSnsShare(buildResultShareUrl(shareToken))
    } catch (err) {
      console.error('공유 URL 생성에 실패했습니다', err)
      onSnsShare()
    }
  }

  return (
    <div className="result-share-modal-overlay" onClick={onClose}>
      <div
        className="result-share-modal"
        role="dialog"
        aria-modal="true"
        style={{ '--share-card-accent': accentColor } as CSSProperties}
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
          <button type="button" className="result-share-modal__button result-share-modal__button--primary" onClick={handleSnsShare}>
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
