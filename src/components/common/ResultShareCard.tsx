import '../../styles/ResultShareCard.css'

interface ResultShareCardProps {
  characterImage: string
  typeName: string
  typeDescription: string
  quote: string
}

function ResultShareCard({ characterImage, typeName, typeDescription, quote }: ResultShareCardProps) {
  return (
    <div className="result-share-card">
      <div className="result-share-card__inner">
        <div className="result-share-card__hill" aria-hidden="true" />
        <img className="result-share-card__character" src={characterImage} alt="" />
        <p className="result-share-card__type-name">{typeName}</p>
        <p className="result-share-card__type-description">{typeDescription}</p>
        <p className="result-share-card__quote">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  )
}

export default ResultShareCard
export type { ResultShareCardProps }
