import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './HistoryCalendar.css'

interface HistoryCalendarProps {
  initialDate?: Date
  markedDates?: Date[]
  selectedDate?: Date
  onDateClick?: (date: Date) => void
  onActiveMonthChange?: (date: Date) => void
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function HistoryCalendar({
  initialDate = new Date(),
  markedDates = [],
  selectedDate,
  onDateClick,
  onActiveMonthChange,
}: HistoryCalendarProps) {
  const markedDateKeys = new Set(markedDates.map(toDateKey))

  return (
    <Calendar
      className="history-calendar"
      locale="ko-KR"
      calendarType="gregory"
      defaultActiveStartDate={initialDate}
      value={selectedDate ?? null}
      onClickDay={(date) => onDateClick?.(date)}
      onActiveStartDateChange={({ activeStartDate, view }) => {
        if (activeStartDate && view === 'month') {
          onActiveMonthChange?.(activeStartDate)
        }
      }}
      prevLabel="‹"
      nextLabel="›"
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
      formatDay={(_, date) => String(date.getDate())}
      formatMonthYear={(_, date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
      tileClassName={({ date, view }) =>
        view === 'month' && markedDateKeys.has(toDateKey(date)) ? 'is-marked' : null
      }
    />
  )
}

export default HistoryCalendar
export type { HistoryCalendarProps }
