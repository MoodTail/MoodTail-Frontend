import cameraIcon from '../../assets/icons/history-bottomsheet-camera.svg'
import cocktailIcon from '../../assets/icons/history-bottomsheet-cocktail.svg'
import testIcon from '../../assets/icons/history-bottomsheet-test.svg'
import BottomSheetPortal from './BottomSheetPortal'
import useBottomSheetClose from './useBottomSheetClose'
import './HistoryActionBottomSheet.css'

interface HistoryActionBottomSheetProps {
  year: number
  month: number
  date: number
  onAddPhoto: () => void
  onRecordCocktail: () => void
  onViewTestResult: () => void
  onClose: () => void
}

const actions = [
  { key: 'photo', icon: cameraIcon, title: '사진 추가', description: '마신 칵테일 사진을 바로 남겨요' },
  { key: 'cocktail', icon: cocktailIcon, title: '칵테일 기록', description: '오늘 마신 칵테일을 기록해요' },
  { key: 'test', icon: testIcon, title: '테스트 결과', description: '저장된 무드 테스트 결과를 확인해요' },
] as const

function HistoryActionBottomSheet({
  year, month, date, onAddPhoto, onRecordCocktail, onViewTestResult, onClose,
}: HistoryActionBottomSheetProps) {
  const { isClosing, requestClose } = useBottomSheetClose(onClose)
  const handlers = { photo: onAddPhoto, cocktail: onRecordCocktail, test: onViewTestResult }

  return (
    <BottomSheetPortal>
      <div className={`history-action-overlay${isClosing ? ' is-closing' : ''}`} onClick={requestClose}>
        <section
          className="history-action-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="history-action-title"
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="history-action-sheet__handle" onClick={requestClose} aria-label="기록 선택 팝업 닫기" />
          <p className="history-action-sheet__date">{year}년 {month}월 {date}일</p>
          <h2 id="history-action-title" className="history-action-sheet__title">오늘의 기록을 어떻게 남길까요?</h2>

          <div className="history-action-sheet__actions">
            {actions.map((action) => (
              <button key={action.key} type="button" className="history-action-sheet__action" onClick={handlers[action.key]}>
                <span className="history-action-sheet__icon-wrap" aria-hidden="true"><img src={action.icon} alt="" /></span>
                <span className="history-action-sheet__copy">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>
                <span className="history-action-sheet__arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </BottomSheetPortal>
  )
}

export default HistoryActionBottomSheet
export type { HistoryActionBottomSheetProps }
