import './HistoryCalendar.css'

interface HistoryCalendarProps {
  year: number
  month: number
  markedDates?: number[]
  selectedDate?: number
  onDateClick?: (date: number) => void
  onPrevMonth?: () => void
  onNextMonth?: () => void
}

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

function HistoryCalendar({
  year,
  month,
  markedDates = [],
  selectedDate,
  onDateClick,
  onPrevMonth,
  onNextMonth,
}: HistoryCalendarProps) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const lastDate = new Date(year, month, 0).getDate()

  const emptyCells = Array.from({ length: firstDay })
  const dates = Array.from({ length: lastDate }, (_, index) => index + 1)

  return (
    <section className="history-calendar">
      <div className="history-calendar__header">
        <button
          type="button"
          className="history-calendar__nav-button"
          onClick={onPrevMonth}
          aria-label="이전 달"
        >
          ‹
        </button>

        <h2 className="history-calendar__title">
          {year}년 {month}월
        </h2>

        <button
          type="button"
          className="history-calendar__nav-button"
          onClick={onNextMonth}
          aria-label="다음 달"
        >
          ›
        </button>
      </div>

      <div className="history-calendar__weekdays">
        {weekDays.map((day) => (
          <span key={day} className="history-calendar__weekday">
            {day}
          </span>
        ))}
      </div>

      <div className="history-calendar__grid">
        {emptyCells.map((_, index) => (
          <span key={`empty-${index}`} className="history-calendar__empty" />
        ))}

        {dates.map((date) => {
          const isMarked = markedDates.includes(date)
          const isSelected = selectedDate === date

          return (
            <button
              key={date}
              type="button"
              className={`history-calendar__date ${isMarked ? 'is-marked' : ''} ${
                isSelected ? 'is-selected' : ''
              }`}
              onClick={() => onDateClick?.(date)}
            >
              {date}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default HistoryCalendar