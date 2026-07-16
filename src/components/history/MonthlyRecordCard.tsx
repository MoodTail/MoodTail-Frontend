import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import noListCharacter from '../../assets/images/history/no_list_character.png'
import './MonthlyRecordCard.css'

interface MonthlyTestRecord {
  date: string
  type: string
  cocktail: string
}

interface MonthlyRecordCardProps {
  records: MonthlyTestRecord[]
}

function MonthlyRecordCard({ records }: MonthlyRecordCardProps) {
  const hasRecords = records.length > 0
  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date))
  const dragStateRef = useRef({ isDragging: false, startY: 0, scrollTop: 0 })

  const formatRecordDate = (date: string) => date.slice(5).replace('-', '.')

  const handlePointerDown = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return

    dragStateRef.current = {
      isDragging: true,
      startY: event.clientY,
      scrollTop: event.currentTarget.scrollTop,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.preventDefault()
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (!dragStateRef.current.isDragging) return

    const distance = event.clientY - dragStateRef.current.startY
    event.currentTarget.scrollTop = dragStateRef.current.scrollTop - distance
    event.preventDefault()
  }

  const handlePointerEnd = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (!dragStateRef.current.isDragging) return

    dragStateRef.current.isDragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      className={`monthly-record-card ${
        hasRecords ? 'monthly-record-card--filled' : 'monthly-record-card--empty'
      }`}
      aria-labelledby="monthly-record-card-title"
    >
      <h2 id="monthly-record-card-title" className="monthly-record-card__title">
        이번 달 테스트 기록
      </h2>

      {hasRecords ? (
        <ul
          className="monthly-record-card__list"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          {sortedRecords.map((record, index) => (
            <li
              key={`${record.date}-${record.type}-${record.cocktail}-${index}`}
              className="monthly-record-card__item"
            >
              <span className="monthly-record-card__date">{formatRecordDate(record.date)}</span>
              <span>{record.type} · {record.cocktail}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="monthly-record-card__empty-content">
          <img
            className="monthly-record-card__empty-image"
            src={noListCharacter}
            alt=""
            aria-hidden="true"
          />
          <p className="monthly-record-card__empty-text">이번달 테스트 기록이 없어요...</p>
        </div>
      )}
    </section>
  )
}

export default MonthlyRecordCard
export type { MonthlyRecordCardProps, MonthlyTestRecord }
