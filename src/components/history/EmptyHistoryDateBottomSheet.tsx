import BottomSheetPortal from './BottomSheetPortal'
import useBottomSheetClose from './useBottomSheetClose'
import './EmptyHistoryDateBottomSheet.css'

interface EmptyHistoryDateBottomSheetProps {
  year: number
  month: number
  date: number
  onAddPhoto: () => void
  onRecordCocktail: () => void
  onClose: () => void
}

function EmptyHistoryDateBottomSheet({
  year,
  month,
  date,
  onAddPhoto,
  onRecordCocktail,
  onClose,
}: EmptyHistoryDateBottomSheetProps) {
  const { isClosing, requestClose } = useBottomSheetClose(onClose)

  return (
    <BottomSheetPortal>
      <div
        className={`empty-history-date-overlay${isClosing ? ' is-closing' : ''}`}
        onClick={requestClose}
      >
      <section
        className="empty-history-date-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="empty-history-date-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="empty-history-date-sheet__handle"
          onClick={requestClose}
          aria-label="기록 없음 팝업 닫기"
        />

        <p className="empty-history-date-sheet__date">
          {year}년 {month}월 {date}일
        </p>
        <h2 id="empty-history-date-title" className="empty-history-date-sheet__title">
          이날은 테스트 기록이 없어요!
        </h2>

        <button
          type="button"
          className="empty-history-date-sheet__button empty-history-date-sheet__button--photo"
          onClick={onAddPhoto}
        >
          사진 추가하기
        </button>
        <button
          type="button"
          className="empty-history-date-sheet__button empty-history-date-sheet__button--cocktail"
          onClick={onRecordCocktail}
        >
          칵테일 기록하기
        </button>
      </section>
      </div>
    </BottomSheetPortal>
  )
}

export default EmptyHistoryDateBottomSheet
export type { EmptyHistoryDateBottomSheetProps }
