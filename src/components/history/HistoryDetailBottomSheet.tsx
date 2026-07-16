import detailModalCharacter from '../../assets/images/history/detail_modal_character.png'
import BottomSheetPortal from './BottomSheetPortal'
import useBottomSheetClose from './useBottomSheetClose'
import './HistoryDetailBottomSheet.css'

interface HistoryDetailBottomSheetProps {
  year: number
  month: number
  date: number
  type: string
  message: string
  onRecordCocktail: () => void
  onViewDetails: () => void
  onClose: () => void
}

function HistoryDetailBottomSheet({
  year,
  month,
  date,
  type,
  message,
  onRecordCocktail,
  onViewDetails,
  onClose,
}: HistoryDetailBottomSheetProps) {
  const { isClosing, requestClose } = useBottomSheetClose(onClose)

  return (
    <BottomSheetPortal>
      <div
        className={`history-detail-overlay${isClosing ? ' is-closing' : ''}`}
        onClick={requestClose}
      >
      <section
        className="history-detail-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="history-detail-sheet__handle"
          onClick={requestClose}
          aria-label="상세 팝업 닫기"
        />

        <button
          type="button"
          className="history-detail-sheet__record-button"
          onClick={onRecordCocktail}
        >
          칵테일 기록하기
        </button>

        <article className="history-detail-sheet__card">
          <p className="history-detail-sheet__date">
            {year}년 {month}월 {date}일
          </p>
          <h2 id="history-detail-title" className="history-detail-sheet__type">
            {type}
          </h2>
          <p className="history-detail-sheet__message">“{message}”</p>
        </article>

        <img
          className="history-detail-sheet__character"
          src={detailModalCharacter}
          alt=""
          aria-hidden="true"
        />

        <button
          type="button"
          className="history-detail-sheet__detail-button"
          onClick={onViewDetails}
        >
          사진 추가 및 상세 보기
        </button>
      </section>
      </div>
    </BottomSheetPortal>
  )
}

export default HistoryDetailBottomSheet
export type { HistoryDetailBottomSheetProps }
