import { useState } from 'react'
import HistoryCalendar from '../components/history/HistoryCalendar'
import '../styles/HistoryPage.css'

function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState<number>()

  return (
    <div className="history-page">
      <h1 className="history-page__title">히스토리</h1>

      <HistoryCalendar
        year={2025}
        month={11}
        markedDates={[4, 12, 18, 23]}
        selectedDate={selectedDate}
        onDateClick={setSelectedDate}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
      />
    </div>
  )
}

export default HistoryPage