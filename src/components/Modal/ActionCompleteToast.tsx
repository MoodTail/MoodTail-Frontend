import { useEffect } from 'react'
import './ActionCompleteToast.css'

type CompleteAction = '삭제' | '저장'

interface ActionCompleteToastProps {
  action: CompleteAction
  onClose: () => void
}

function ActionCompleteToast({ action, onClose }: ActionCompleteToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2600)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="action-complete-toast" role="status" aria-live="polite">
      {action} 완료되었습니다
    </div>
  )
}

export default ActionCompleteToast
export type { ActionCompleteToastProps, CompleteAction }
