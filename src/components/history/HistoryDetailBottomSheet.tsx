import HistoryActionBottomSheet from './HistoryActionBottomSheet'

interface HistoryDetailBottomSheetProps {
  year: number
  month: number
  date: number
  type: string
  message: string
  onRecordCocktail: () => void
  onViewDetails: () => void
  onViewTestResult: () => void
  onClose: () => void
}

function HistoryDetailBottomSheet({
  year,
  month,
  date,
  onRecordCocktail,
  onViewDetails,
  onViewTestResult,
  onClose,
}: HistoryDetailBottomSheetProps) {
  return (
    <HistoryActionBottomSheet
      year={year}
      month={month}
      date={date}
      onAddPhoto={onViewDetails}
      onRecordCocktail={onRecordCocktail}
      onViewTestResult={onViewTestResult}
      onClose={onClose}
    />
  )
}

export default HistoryDetailBottomSheet
export type { HistoryDetailBottomSheetProps }
