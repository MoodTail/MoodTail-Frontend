import { useEffect, useRef, useState } from 'react'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import resultCharacter from '../../assets/images/history/detail_modal_character.png'
import emptyResultCharacter from '../../assets/images/history/no_list_character.png'
import sunsetFizzImage from '../../assets/images/history/sunset-fizz.png'
import mojitoImage from '../../assets/images/history/mojito.png'
import pinaColadaImage from '../../assets/images/history/pina-colada.png'
import ginAndTonicImage from '../../assets/images/history/gin-and-tonic.png'
import HistoryPhotoUploader, {
  type HistoryPhotoUploaderHandle,
} from '../../components/history/HistoryPhotoUploader'
import HistoryPrimaryButton from '../../components/history/HistoryPrimaryButton'
import TwoButtonModal from '../../components/common/modal/TwoButtonModal'
import CocktailSearchOverlay, {
  type CocktailSelection,
} from '../../components/history/CocktailSearchOverlay'
import './HistoryPhotoPage.css'

type HistoryRecordTab = 'photo' | 'cocktail' | 'result'

interface HistoryPhotoPageProps {
  onBack: () => void
  hasTestResult: boolean
  selectedDate: Date
  initialTab?: HistoryRecordTab
}

function HistoryPhotoPage({
  onBack,
  hasTestResult,
  selectedDate,
  initialTab = 'photo',
}: HistoryPhotoPageProps) {
  const [activeTab, setActiveTab] = useState<HistoryRecordTab>(initialTab)
  const [isCocktailSearchOpen, setIsCocktailSearchOpen] = useState(false)
  const [selectedCocktails, setSelectedCocktails] = useState<CocktailSelection[]>([])
  const [isCocktailEditMode, setIsCocktailEditMode] = useState(false)
  const [deletingCocktail, setDeletingCocktail] = useState<CocktailSelection>()
  const [isDeleteToastVisible, setIsDeleteToastVisible] = useState(false)
  const photoUploaderRef = useRef<HistoryPhotoUploaderHandle>(null)
  const deleteToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const changeTab = (tab: HistoryRecordTab) => {
    photoUploaderRef.current?.collapseSheet()
    setActiveTab(tab)
  }

  useEffect(
    () => () => {
      if (deleteToastTimerRef.current) clearTimeout(deleteToastTimerRef.current)
    },
    [],
  )

  const handleDeleteCocktail = () => {
    if (!deletingCocktail) return
    setSelectedCocktails((current) =>
      current.filter((cocktail) => cocktail.id !== deletingCocktail.id),
    )
    setDeletingCocktail(undefined)
    setIsCocktailEditMode(false)
    setIsDeleteToastVisible(true)
    if (deleteToastTimerRef.current) clearTimeout(deleteToastTimerRef.current)
    deleteToastTimerRef.current = setTimeout(() => setIsDeleteToastVisible(false), 2600)
  }

  return (
    <div className="history-photo-page">
      <header className="history-photo-page__header">
        <button
          type="button"
          className="history-photo-page__back-button"
          onClick={onBack}
          aria-label="히스토리로 돌아가기"
        >
          <img src={chevronLeftIcon} alt="" />
        </button>
        <h1>히스토리</h1>
      </header>

      <p className="history-photo-page__date">
        {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
        {selectedDate.getDate()}일 기록
      </p>

      <nav className="history-photo-page__tabs" aria-label="히스토리 상세 메뉴">
        <button
          type="button"
          className={`history-photo-page__tab${activeTab === 'photo' ? ' is-active' : ''}`}
          onClick={() => changeTab('photo')}
        >
          사진 추가
        </button>
        <button
          type="button"
          className={`history-photo-page__tab${activeTab === 'cocktail' ? ' is-active' : ''}`}
          onClick={() => changeTab('cocktail')}
        >
          칵테일 기록
        </button>
        <button
          type="button"
          className={`history-photo-page__tab${activeTab === 'result' ? ' is-active' : ''}`}
          onClick={() => changeTab('result')}
        >
          테스트 결과
        </button>
      </nav>

      <div hidden={activeTab !== 'photo'}>
        <HistoryPhotoUploader ref={photoUploaderRef} collapsible />
      </div>

      {activeTab === 'cocktail' && (
        <section className="history-cocktail-record" aria-labelledby="cocktail-record-title">
          <div className="history-cocktail-record__heading">
            <h2 id="cocktail-record-title">먹은 칵테일</h2>
            <button
              type="button"
              className={isCocktailEditMode ? 'is-active' : ''}
              onClick={() => setIsCocktailEditMode((current) => !current)}
            >
              편집
            </button>
          </div>

          {selectedCocktails.length === 0 ? (
            <div className="history-cocktail-record__empty">
              <strong>아직 선택한 칵테일이 없어요</strong>
              <p>칵테일 기록 버튼을 눌러 선택해보세요</p>
            </div>
          ) : (
            <>
            <div className="history-cocktail-record__selected-list">
              {selectedCocktails.map((cocktail) => (
                <article key={cocktail.id} className="history-cocktail-record__selected-item">
                  <img src={cocktail.image} alt="" />
                  <span>
                    <strong>{cocktail.name}</strong>
                    <small>{cocktail.description}</small>
                  </span>
                  {isCocktailEditMode ? (
                    <button
                      type="button"
                      className="history-cocktail-record__remove"
                      onClick={() => setDeletingCocktail(cocktail)}
                      aria-label={`${cocktail.name} 삭제`}
                    >
                      −
                    </button>
                  ) : (
                    <b>{cocktail.temperature}</b>
                  )}
                </article>
              ))}
            </div>
            <div className="history-cocktail-record__list-fade" aria-hidden="true" />
            </>
          )}

          <HistoryPrimaryButton
            className="history-cocktail-record__add-button"
            onClick={() => setIsCocktailSearchOpen(true)}
          >
            추가하기
          </HistoryPrimaryButton>
          {isDeleteToastVisible && (
            <div className="history-cocktail-record__delete-toast" role="status">
              삭제 완료되었습니다
            </div>
          )}
        </section>
      )}

      {activeTab === 'result' && (
        <section className="history-test-result">
          {hasTestResult ? (
            <>
              <article className="history-test-result__summary">
                <div className="history-test-result__character-wrap">
                  <img src={resultCharacter} alt="현실주의자 캐릭터" />
                </div>
                <h2>현실주의자</h2>
                <p>“차분하지만 섬세한 한 잔이 필요했어요.”</p>
              </article>

              <section className="history-test-result__recommendations">
                <h2>추천 칵테일 TOP 4</h2>
                <div className="history-test-result__grid">
                  {[
                    { rank: 1, name: '선셋 피즈', match: 95, image: sunsetFizzImage },
                    { rank: 2, name: '모히토', match: 75, image: mojitoImage },
                    { rank: 3, name: '피냐콜라다', match: 55, image: pinaColadaImage },
                    { rank: 4, name: '진토닉', match: 25, image: ginAndTonicImage },
                  ].map((cocktail) => (
                    <article key={cocktail.rank} className="history-test-result__cocktail-card">
                      <span>{cocktail.rank}위</span>
                      <img src={cocktail.image} alt="" />
                      <strong>{cocktail.name}</strong>
                      <small>일치율 {cocktail.match}%</small>
                    </article>
                  ))}
                </div>
              </section>

              <HistoryPrimaryButton className="history-test-result__bottom-button">
                전체 결과보기
              </HistoryPrimaryButton>
            </>
          ) : (
            <>
              <article className="history-test-result__empty-card">
                <img src={emptyResultCharacter} alt="테스트 기록 없음" />
                <strong>테스트 기록이 없어요..</strong>
              </article>
              <HistoryPrimaryButton className="history-test-result__bottom-button">
                테스트하러 가기
              </HistoryPrimaryButton>
            </>
          )}
        </section>
      )}

      {isCocktailSearchOpen && (
        <CocktailSearchOverlay
          initialCocktails={selectedCocktails}
          onSave={(cocktails) => {
            setSelectedCocktails(cocktails)
            setIsCocktailSearchOpen(false)
          }}
        />
      )}

      <TwoButtonModal
        isOpen={Boolean(deletingCocktail)}
        title="기록을 삭제하시겠어요?"
        description="삭제된 기록은 복구가 어렵습니다"
        leftButton={{ label: '닫기', variant: 'primary', onClick: () => setDeletingCocktail(undefined) }}
        rightButton={{ label: '삭제하기', variant: 'secondary', onClick: handleDeleteCocktail }}
        onOverlayClick={() => setDeletingCocktail(undefined)}
      />
    </div>
  )
}

export default HistoryPhotoPage
export type { HistoryPhotoPageProps, HistoryRecordTab }
