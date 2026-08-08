import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createDrinkingRecord,
  deleteDrinkingRecord,
  getDailyHistory,
  getHistoryTestResult,
} from '../../api/histories/histories.api'
import type {
  DailyHistoryPhoto,
  HistoryTestResultDetail,
} from '../../api/histories/histories.types'
import chevronLeftIcon from '../../assets/icons/chevron-left.svg'
import emptyResultCharacter from '../../assets/images/history/no_list_character.png'
import ginAndTonicImage from '../../assets/images/history/gin-and-tonic.png'
import HistoryPhotoUploader, {
  type HistoryPhotoUploaderHandle,
} from '../../components/history/HistoryPhotoUploader'
import HistoryPrimaryButton from '../../components/history/HistoryPrimaryButton'
import TwoButtonModal from '../../components/common/modal/TwoButtonModal'
import ActionCompleteToast from '../../components/Modal/ActionCompleteToast'
import HistoryBackground from '../../components/common/HistoryBackground'
import CocktailSearchOverlay, {
  type CocktailSelection,
} from '../../components/history/CocktailSearchOverlay'
import './HistoryPhotoPage.css'

type HistoryRecordTab = 'photo' | 'cocktail' | 'result'

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

interface HistoryPhotoPageProps {
  onBack: () => void
  onOpenFullResult: () => void
  onStartTest: () => void
  hasTestResult: boolean
  selectedDate: Date
  initialTab?: HistoryRecordTab
}

function HistoryPhotoPage({
  onBack,
  onOpenFullResult,
  onStartTest,
  selectedDate,
  initialTab = 'photo',
}: HistoryPhotoPageProps) {
  const selectedDateKey = toDateKey(selectedDate)
  const [activeTab, setActiveTab] = useState<HistoryRecordTab>(initialTab)
  const [isCocktailSearchOpen, setIsCocktailSearchOpen] = useState(false)
  const [selectedCocktails, setSelectedCocktails] = useState<CocktailSelection[]>([])
  const [isCocktailEditMode, setIsCocktailEditMode] = useState(false)
  const [deletingCocktail, setDeletingCocktail] = useState<CocktailSelection>()
  const [isDeleteToastVisible, setIsDeleteToastVisible] = useState(false)
  const [isDailyHistoryLoading, setIsDailyHistoryLoading] = useState(false)
  const [dailyHistoryError, setDailyHistoryError] = useState<string>()
  const [testResultDetail, setTestResultDetail] =
    useState<HistoryTestResultDetail>()
  const [testResultError, setTestResultError] = useState<string>()
  const [historyPhotos, setHistoryPhotos] = useState<DailyHistoryPhoto[]>([])
  const photoUploaderRef = useRef<HistoryPhotoUploaderHandle>(null)

  const fetchDailyHistory = useCallback(async (signal?: AbortSignal) => {
    try {
      setIsDailyHistoryLoading(true)
      setDailyHistoryError(undefined)
      setTestResultError(undefined)
      setTestResultDetail(undefined)

      const result = await getDailyHistory(selectedDateKey, signal)
      setHistoryPhotos(result.photos)
      setSelectedCocktails(
        result.drinkingRecords.map((record) => ({
          id: record.cocktailId,
          recordId: record.recordId,
          name: record.cocktailName,
          description: record.shortDescription ?? '',
          temperature:
            record.alcoholDegree === null ? '-' : `${record.alcoholDegree}°`,
          image: record.cocktailImageUrl ?? ginAndTonicImage,
        })),
      )

      if (result.testResult) {
        try {
          const detail = await getHistoryTestResult(
            result.testResult.resultId,
            signal,
          )
          setTestResultDetail(detail)
        } catch (error) {
          if (signal?.aborted) return
          console.error(error)
          setTestResultError('테스트 결과를 불러오지 못했습니다.')
        }
      }
    } catch (error) {
      if (signal?.aborted) return
      console.error(error)
      setDailyHistoryError('날짜별 기록을 불러오지 못했습니다.')
      throw error
    } finally {
      if (!signal?.aborted) setIsDailyHistoryLoading(false)
    }
  }, [selectedDateKey])

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => {
      void fetchDailyHistory(controller.signal).catch(() => undefined)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [fetchDailyHistory])

  const changeTab = (tab: HistoryRecordTab) => {
    photoUploaderRef.current?.collapseSheet()
    setActiveTab(tab)
  }

  const handleCloseDeleteToast = useCallback(() => setIsDeleteToastVisible(false), [])

  const handleDeleteCocktail = async () => {
    if (deletingCocktail?.recordId === undefined) return

    try {
      await deleteDrinkingRecord(deletingCocktail.recordId)
      await fetchDailyHistory()
      setDeletingCocktail(undefined)
      setIsCocktailEditMode(false)
      setIsDeleteToastVisible(true)
    } catch (error) {
      console.error(error)
      setDailyHistoryError('칵테일 기록을 삭제하지 못했습니다.')
      setDeletingCocktail(undefined)
    }
  }

  const handleSaveCocktails = async (cocktails: CocktailSelection[]) => {
    const newCocktails = cocktails.filter(
      (cocktail) => cocktail.recordId === undefined,
    )

    if (newCocktails.length === 0) return

    try {
      await createDrinkingRecord({
        cocktailIds: newCocktails.map((cocktail) => cocktail.id),
        recordDate: selectedDateKey,
      })
    } finally {
      await fetchDailyHistory()
    }
  }

  return (
    <div className="history-photo-page">
      <HistoryBackground />
      {!isCocktailSearchOpen && (
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
      )}

      {!isCocktailSearchOpen && (
        <>
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
        </>
      )}

      <div hidden={activeTab !== 'photo'}>
        <HistoryPhotoUploader
          ref={photoUploaderRef}
          collapsible
          date={selectedDateKey}
          initialPhotos={historyPhotos}
        />
      </div>

      {activeTab === 'cocktail' && !isCocktailSearchOpen && (
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

          {isDailyHistoryLoading ? (
            <div className="history-cocktail-record__empty">
              <strong>칵테일 기록을 불러오는 중...</strong>
            </div>
          ) : dailyHistoryError ? (
            <div className="history-cocktail-record__empty">
              <strong>{dailyHistoryError}</strong>
            </div>
          ) : selectedCocktails.length === 0 ? (
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
            <ActionCompleteToast action="삭제" onClose={handleCloseDeleteToast} />
          )}
        </section>
      )}

      {activeTab === 'result' && (
        <section className="history-test-result">
          {isDailyHistoryLoading ? (
            <article className="history-test-result__empty-card">
              <strong>테스트 결과를 불러오는 중...</strong>
            </article>
          ) : testResultError ? (
            <article className="history-test-result__empty-card">
              <strong>{testResultError}</strong>
            </article>
          ) : testResultDetail ? (
            <>
              <article className="history-test-result__summary">
                <div className="history-test-result__character-wrap">
                  <img
                    src={testResultDetail.moodType.characterImageUrl}
                    alt={`${testResultDetail.moodType.name} 캐릭터`}
                  />
                </div>
                <h2>{testResultDetail.moodType.name}</h2>
                <p>“{testResultDetail.moodType.characterQuote}”</p>
              </article>

              <section className="history-test-result__recommendations">
                <h2>추천 칵테일 TOP 4</h2>
                <div className="history-test-result__grid">
                  {testResultDetail.recommendedCocktails.map((cocktail) => (
                    <article
                      key={cocktail.cocktailId}
                      className="history-test-result__cocktail-card"
                    >
                      <span>{cocktail.ranking}위</span>
                      <img src={cocktail.cocktailImageUrl} alt="" />
                      <strong>{cocktail.cocktailName}</strong>
                      <small>{cocktail.shortDescription} · {cocktail.matchScore}%</small>
                    </article>
                  ))}
                </div>
              </section>

              <HistoryPrimaryButton
                className="history-test-result__bottom-button"
                onClick={onOpenFullResult}
              >
                전체 결과보기
              </HistoryPrimaryButton>
            </>
          ) : (
            <>
              <article className="history-test-result__empty-card">
                <img src={emptyResultCharacter} alt="테스트 기록 없음" />
                <strong>테스트 기록이 없어요..</strong>
              </article>
              <HistoryPrimaryButton
                className="history-test-result__bottom-button"
                onClick={onStartTest}
              >
                테스트하러 가기
              </HistoryPrimaryButton>
            </>
          )}
        </section>
      )}

      {isCocktailSearchOpen && (
        <CocktailSearchOverlay
          initialCocktails={selectedCocktails}
          onSave={handleSaveCocktails}
          onClose={() => setIsCocktailSearchOpen(false)}
        />
      )}

      <TwoButtonModal
        isOpen={Boolean(deletingCocktail)}
        title="기록을 삭제하시겠어요?"
        description="삭제된 기록은 복구가 어렵습니다"
        leftButton={{ label: '닫기', variant: 'primary', onClick: () => setDeletingCocktail(undefined) }}
        rightButton={{
          label: '삭제하기',
          variant: 'secondary',
          onClick: () => void handleDeleteCocktail(),
        }}
        onOverlayClick={() => setDeletingCocktail(undefined)}
      />
    </div>
  )
}

export default HistoryPhotoPage
export type { HistoryPhotoPageProps, HistoryRecordTab }
