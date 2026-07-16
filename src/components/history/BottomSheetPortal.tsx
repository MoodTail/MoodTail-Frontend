import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface BottomSheetPortalProps {
  children: ReactNode
}

function BottomSheetPortal({ children }: BottomSheetPortalProps) {
  const appRoot = document.querySelector('.app')

  return createPortal(children, appRoot ?? document.body)
}

export default BottomSheetPortal
