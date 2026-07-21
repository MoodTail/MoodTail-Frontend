import { useEffect } from 'react'
import '../../styles/SaveCompleteToast.css'

interface SaveCompleteToastProps {
  message: string
  isVisible: boolean
  onHide: () => void
  duration?: number
}

function SaveCompleteToast({ message, isVisible, onHide, duration = 2500 }: SaveCompleteToastProps) {
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(onHide, duration)
    return () => clearTimeout(timer)
  }, [isVisible, duration, onHide])

  if (!isVisible) return null

  return (
    <div className="save-complete-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}

export default SaveCompleteToast
export type { SaveCompleteToastProps }
