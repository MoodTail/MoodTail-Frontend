import { useEffect, useRef, useState } from 'react'

const BOTTOM_SHEET_CLOSE_DURATION_MS = 260

function useBottomSheetClose(onClose: () => void) {
  const [isClosing, setIsClosing] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const requestClose = () => {
    if (isClosing) return

    setIsClosing(true)
    closeTimerRef.current = setTimeout(onClose, BOTTOM_SHEET_CLOSE_DURATION_MS)
  }

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    },
    [],
  )

  return { isClosing, requestClose }
}

export default useBottomSheetClose
