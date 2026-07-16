import type { ButtonHTMLAttributes } from 'react'
import './HistoryPrimaryButton.css'

type HistoryPrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function HistoryPrimaryButton({
  className = '',
  type = 'button',
  ...props
}: HistoryPrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`history-primary-button${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}

export default HistoryPrimaryButton
export type { HistoryPrimaryButtonProps }
