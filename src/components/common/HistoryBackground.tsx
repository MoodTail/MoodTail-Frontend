import './HistoryBackground.css'

function HistoryBackground() {
  return (
    <div className="history-background" aria-hidden="true">
      <div className="history-background__glow history-background__glow--top" />
      <div className="history-background__glow history-background__glow--bottom" />
    </div>
  )
}

export default HistoryBackground
