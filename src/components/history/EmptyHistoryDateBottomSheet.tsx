import HistoryActionBottomSheet from './HistoryActionBottomSheet'

interface EmptyHistoryDateBottomSheetProps {
  year: number
  month: number
  date: number
  onAddPhoto: () => void
  onRecordCocktail: () => void
  onViewTestResult: () => void
  onClose: () => void
}

function EmptyHistoryDateBottomSheet(props: EmptyHistoryDateBottomSheetProps) {
  return <HistoryActionBottomSheet {...props} />
}

export default EmptyHistoryDateBottomSheet
export type { EmptyHistoryDateBottomSheetProps }
