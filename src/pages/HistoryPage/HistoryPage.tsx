import { useEffect, useState } from 'react'
import {
  getHistoryTestResult,
  getMonthlyHistory,
} from '../../api/histories/histories.api'
import type {
  HistoryCalendarDay,
  MonthlyHistoryResult,
} from '../../api/histories/histories.types'
import HistoryCalendar from '../../components/history/HistoryCalendar'
import MonthlyReportNoticeModal from '../../components/history/MonthlyReportNoticeModal'
import MonthlyRecordCard, {
  type MonthlyTestRecord,
} from '../../components/history/MonthlyRecordCard'
import HistoryDetailBottomSheet from '../../components/history/HistoryDetailBottomSheet'
import EmptyHistoryDateBottomSheet from '../../components/history/EmptyHistoryDateBottomSheet'
import SaveCompleteModal from '../../components/Modal/SaveCompleteModal'
import TwoButtonModal from '../../components/common/modal/TwoButtonModal'
import HistoryBackground from '../../components/common/HistoryBackground'
import {
  hasSeenHistoryEntryNotice,
  markHistoryEntryNoticeAsSeen,
} from '../../utils/historyNotice'
import '../../styles/HistoryPage.css'

const INITIAL_CALENDAR_DATE = new Date()
const MAX_HISTORY_DATE = new Date()

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

interface HistoryPageProps {
  onOpenPhotoDetails: (hasTestResult: boolean, date: Date) => void
  onOpenCocktailRecord: (hasTestResult: boolean, date: Date) => void
  onOpenTestResult: (hasTestResult: boolean, date: Date) => void
  onOpenMonthlyReport: (month: Date) => void
  onStartTest: () => void
  isLoggedIn: boolean
  onGoToLogin: () => void
}

function HistoryPage({
  onOpenPhotoDetails,
  onOpenCocktailRecord,
  onOpenTestResult,
  onOpenMonthlyReport,
  onStartTest,
  isLoggedIn,
  onGoToLogin,
}: HistoryPageProps) {
  const [activeMonth, setActiveMonth] = useState(INITIAL_CALENDAR_DATE)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isMonthlyReportModalOpen, setIsMonthlyReportModalOpen] = useState(
    () => !hasSeenHistoryEntryNotice(),
  )
  const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false)
  const [isNoMonthlyReportModalOpen, setIsNoMonthlyReportModalOpen] = useState(false)
  const [monthlyHistory, setMonthlyHistory] = useState<MonthlyHistoryResult>()
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyTestRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] = useState(
    () => !isLoggedIn,
  )

  const historyDays = monthlyHistory?.days ?? []
  const markedDates = historyDays
    .filter((day) => day.hasTestResult)
    .map((day) => new Date(`${day.date}T00:00:00`))
  const selectedDay: HistoryCalendarDay | undefined = selectedDate
    ? historyDays.find((day) => day.date === toDateKey(selectedDate))
    : undefined
  const selectedRecord = selectedDate
    ? monthlyRecords.find((record) => record.date === toDateKey(selectedDate))
    : undefined
  const reportAvailable = monthlyHistory?.reportAvailable ?? false

  useEffect(() => {
    if (!isLoggedIn) {
      setMonthlyHistory(undefined)
      setMonthlyRecords([])
      return
    }

    let ignore = false

    const fetchMonthlyHistory = async () => {
      try {
        setIsLoading(true)
        setErrorMessage(undefined)
        setMonthlyRecords([])

        const result = await getMonthlyHistory({
          year: activeMonth.getFullYear(),
          month: activeMonth.getMonth() + 1,
        })

        if (!ignore) {
          setMonthlyHistory(result)
        }

        const detailResults = await Promise.allSettled(
          result.testResults.map((testResult) =>
            getHistoryTestResult(testResult.resultId),
          ),
        )

        if (!ignore) {
          const records = detailResults.flatMap((detailResult) => {
            if (detailResult.status === 'rejected') {
              console.error(detailResult.reason)
              return []
            }

            const detail = detailResult.value
            const topCocktail = [...detail.recommendedCocktails].sort(
              (a, b) => a.ranking - b.ranking,
            )[0]

            return [
              {
                date: detail.resultDate,
                type: detail.moodType.name,
                cocktail: topCocktail?.cocktailName ?? '추천 칵테일 없음',
              },
            ]
          })

          setMonthlyRecords(records)
        }
      } catch (error) {
        console.error(error)

        if (!ignore) {
          setMonthlyHistory(undefined)
          setMonthlyRecords([])
          setErrorMessage('히스토리를 불러오지 못했습니다.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void fetchMonthlyHistory()

    return () => {
      ignore = true
    }
  }, [activeMonth, isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) setIsLoginRequiredModalOpen(true)
  }, [isLoggedIn])

  useEffect(() => {
    if (monthlyHistory && isMonthlyReportModalOpen) {
      markHistoryEntryNoticeAsSeen()
    }
  }, [monthlyHistory, isMonthlyReportModalOpen])

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsHistoryDetailOpen(true)
  }

  const handleActiveMonthChange = (date: Date) => {
    if (
      date.getFullYear() === activeMonth.getFullYear()
      && date.getMonth() === activeMonth.getMonth()
    ) {
      return
    }

    setActiveMonth(date)
    setSelectedDate(undefined)
    setIsHistoryDetailOpen(false)
  }

  const handleCloseHistoryDetail = () => {
    setIsHistoryDetailOpen(false)
    setSelectedDate(undefined)
  }

  const handleViewMonthlyReport = () => {
    if (!reportAvailable) {
      setIsMonthlyReportModalOpen(false)
      setIsNoMonthlyReportModalOpen(true)
      return
    }

    setIsMonthlyReportModalOpen(false)
    onOpenMonthlyReport(activeMonth)
  }

  const handleGoToTest = () => {
    setIsMonthlyReportModalOpen(false)
    onStartTest()
  }

  const monthlyReportNotice = reportAvailable
    ? {
        title: '월간 리포트가 도착했어요',
        description: '이번 달 테스트 기록이 5회 이상 쌓였어요.\n이달의 타입과 칵테일 통계를 확인해보세요.',
        primaryButtonLabel: '리포트 보기',
        onPrimaryAction: handleViewMonthlyReport,
      }
    : {
        title: '기록이 더 필요해요',
        description: '월간 리포트는 이번 달 테스트 기록이 5회\n이상일 때 확인할 수 있어요.',
        primaryButtonLabel: '테스트하러 가기',
        onPrimaryAction: handleGoToTest,
      }

  return (
    <div className="history-page">
      <HistoryBackground />
      <h1 className="history-page__title">히스토리</h1>

      <HistoryCalendar
        initialDate={INITIAL_CALENDAR_DATE}
        maxDate={MAX_HISTORY_DATE}
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
        onActiveMonthChange={handleActiveMonthChange}
      />

      {isLoading && <p className="history-page__status">히스토리를 불러오는 중...</p>}
      {errorMessage && (
        <p className="history-page__status history-page__status--error">{errorMessage}</p>
      )}

      <MonthlyRecordCard records={monthlyRecords} isLoading={isLoading} />

      <button
        type="button"
        className="history-page__monthly-report-button"
        onClick={handleViewMonthlyReport}
      >
        월간 리포트 보기
      </button>

      {monthlyHistory && isMonthlyReportModalOpen && (
        <MonthlyReportNoticeModal
          title={monthlyReportNotice.title}
          description={monthlyReportNotice.description}
          primaryButtonLabel={monthlyReportNotice.primaryButtonLabel}
          onPrimaryAction={monthlyReportNotice.onPrimaryAction}
          onClose={() => setIsMonthlyReportModalOpen(false)}
        />
      )}

      {isHistoryDetailOpen && selectedDate && selectedDay && (
        <HistoryDetailBottomSheet
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          date={selectedDate.getDate()}
          type={selectedDay.moodType?.name ?? selectedRecord?.type ?? ''}
          message="재미있으면 그걸로 충분한 거 아닐까?"
          onRecordCocktail={() => {
            onOpenCocktailRecord(selectedDay.hasTestResult, selectedDate)
          }}
          onViewDetails={() => {
            onOpenPhotoDetails(selectedDay.hasTestResult, selectedDate)
          }}
          onViewTestResult={() => onOpenTestResult(selectedDay.hasTestResult, selectedDate)}
          onClose={handleCloseHistoryDetail}
        />
      )}

      {isHistoryDetailOpen && selectedDate && !selectedDay && (
        <EmptyHistoryDateBottomSheet
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          date={selectedDate.getDate()}
          onAddPhoto={() => {
            onOpenPhotoDetails(false, selectedDate)
          }}
          onRecordCocktail={() => {
            onOpenCocktailRecord(false, selectedDate)
          }}
          onViewTestResult={() => onOpenTestResult(false, selectedDate)}
          onClose={handleCloseHistoryDetail}
        />
      )}

      {isNoMonthlyReportModalOpen && (
        <SaveCompleteModal
          title="월간리포트가 없습니다"
          onClose={() => setIsNoMonthlyReportModalOpen(false)}
        />
      )}

      <TwoButtonModal
        isOpen={isLoginRequiredModalOpen}
        title="로그인이 필요해요"
        description={'히스토리는 로그인 후 이용할 수 있어요.\n로그인 화면으로 이동할까요?'}
        leftButton={{
          label: '로그인 하러가기',
          onClick: () => {
            setIsLoginRequiredModalOpen(false)
            onGoToLogin()
          },
          variant: 'primary',
        }}
        rightButton={{
          label: '닫기',
          onClick: () => setIsLoginRequiredModalOpen(false),
          variant: 'secondary',
        }}
        onOverlayClick={() => setIsLoginRequiredModalOpen(false)}
      />
    </div>
  )
}

export default HistoryPage

export type { HistoryPageProps }

//웹훅 설정 확인용
