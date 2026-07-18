import { useState } from 'react'
import HistoryCalendar from '../../components/history/HistoryCalendar'
import MonthlyReportNoticeModal from '../../components/history/MonthlyReportNoticeModal'
import MonthlyRecordCard, {
  type MonthlyTestRecord,
} from '../../components/history/MonthlyRecordCard'
import HistoryDetailBottomSheet from '../../components/history/HistoryDetailBottomSheet'
import EmptyHistoryDateBottomSheet from '../../components/history/EmptyHistoryDateBottomSheet'
import '../../styles/HistoryPage.css'

const INITIAL_CALENDAR_DATE = new Date()
const initialYear = INITIAL_CALENDAR_DATE.getFullYear()
const initialMonth = String(INITIAL_CALENDAR_DATE.getMonth() + 1).padStart(2, '0')

// TODO: 전체 히스토리 API 응답으로 교체 (date는 YYYY-MM-DD 형식)
const MOCK_HISTORY_RECORDS: MonthlyTestRecord[] = [
  { date: `${initialYear}-${initialMonth}-23`, type: '소다', cocktail: '모히토' },
  { date: `${initialYear}-${initialMonth}-02`, type: '몽상가', cocktail: '블루 라군' },
  { date: `${initialYear}-${initialMonth}-16`, type: '낭만주의자', cocktail: '마티니' },
  { date: `${initialYear}-${initialMonth}-04`, type: '피치', cocktail: 'Corpse Reviver #2' },
  { date: `${initialYear}-${initialMonth}-18`, type: '현실주의자', cocktail: '진 피즈' },
  { date: `${initialYear}-${initialMonth}-06`, type: '모험가', cocktail: '마이 타이' },
  { date: `${initialYear}-${initialMonth}-14`, type: '이상주의자', cocktail: '김렛' },
  { date: `${initialYear}-${initialMonth}-08`, type: '평화주의자', cocktail: '미모사' },
  { date: `${initialYear}-${initialMonth}-12`, type: '클래식', cocktail: '다이키리' },
  { date: `${initialYear}-${initialMonth}-10`, type: '분석가', cocktail: '네그로니' },
]

// TODO: API 연결 후 monthlyRecords.length >= 5 조건으로 교체
const IS_MONTHLY_REPORT_READY_UI_MOCK = true

function toMonthKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

interface HistoryPageProps {
  onOpenPhotoDetails: (hasTestResult: boolean) => void
}

function HistoryPage({ onOpenPhotoDetails }: HistoryPageProps) {
  const [activeMonth, setActiveMonth] = useState(INITIAL_CALENDAR_DATE)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isMonthlyReportModalOpen, setIsMonthlyReportModalOpen] = useState(true)
  const [isHistoryDetailOpen, setIsHistoryDetailOpen] = useState(false)

  const activeMonthKey = toMonthKey(activeMonth)
  const monthlyRecords = MOCK_HISTORY_RECORDS.filter((record) =>
    record.date.startsWith(activeMonthKey),
  )
  const markedDates = monthlyRecords.map((record) => new Date(`${record.date}T00:00:00`))
  const selectedRecord = selectedDate
    ? monthlyRecords.find((record) => record.date === toDateKey(selectedDate))
    : undefined

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsHistoryDetailOpen(true)
  }

  const handleActiveMonthChange = (date: Date) => {
    setActiveMonth(date)
    setSelectedDate(undefined)
    setIsHistoryDetailOpen(false)
  }

  const handleCloseHistoryDetail = () => {
    setIsHistoryDetailOpen(false)
    setSelectedDate(undefined)
  }

  const handleViewMonthlyReport = () => {
    setIsMonthlyReportModalOpen(false)
    // TODO: 월간 리포트 화면 연결
  }

  const handleGoToTest = () => {
    setIsMonthlyReportModalOpen(false)
    // TODO: 테스트 화면 구현 후 이동 연결
  }

  const monthlyReportNotice = IS_MONTHLY_REPORT_READY_UI_MOCK
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
      <h1 className="history-page__title">히스토리</h1>

      <HistoryCalendar
        initialDate={INITIAL_CALENDAR_DATE}
        markedDates={markedDates}
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
        onActiveMonthChange={handleActiveMonthChange}
      />

      <MonthlyRecordCard records={monthlyRecords} />

      <button type="button" className="history-page__monthly-report-button">
        월간 리포트 보기
      </button>

      {isMonthlyReportModalOpen && (
        <MonthlyReportNoticeModal
          title={monthlyReportNotice.title}
          description={monthlyReportNotice.description}
          primaryButtonLabel={monthlyReportNotice.primaryButtonLabel}
          onPrimaryAction={monthlyReportNotice.onPrimaryAction}
          onClose={() => setIsMonthlyReportModalOpen(false)}
        />
      )}

      {isHistoryDetailOpen && selectedDate && selectedRecord && (
        <HistoryDetailBottomSheet
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          date={selectedDate.getDate()}
          type={selectedRecord.type}
          message="재미있으면 그걸로 충분한 거 아닐까?"
          onRecordCocktail={() => {
            // TODO: 칵테일 기록 화면 연결
          }}
          onViewDetails={() => {
            onOpenPhotoDetails(true)
          }}
          onClose={handleCloseHistoryDetail}
        />
      )}

      {isHistoryDetailOpen && selectedDate && !selectedRecord && (
        <EmptyHistoryDateBottomSheet
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          date={selectedDate.getDate()}
          onAddPhoto={() => {
            onOpenPhotoDetails(false)
          }}
          onRecordCocktail={() => {
            // TODO: 칵테일 기록 화면 연결
          }}
          onClose={handleCloseHistoryDetail}
        />
      )}
    </div>
  )
}

export default HistoryPage

export type { HistoryPageProps }

//웹훅 설정 확인용
