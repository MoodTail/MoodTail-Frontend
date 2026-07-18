import '../../styles/ShareCard.css'

interface ShareCardProps {
  characterImage: string
  typeName: string
  typeDescription: string
  quote: string
}

function ShareCard({ characterImage, typeName, typeDescription, quote }: ShareCardProps) {
  return (
    <div className="share-card">
      <div className="share-card__inner">
        <div className="share-card__hill" aria-hidden="true" />
        <img className="share-card__character" src={characterImage} alt="" />
        <p className="share-card__type-name">{typeName}</p>
        <p className="share-card__type-description">{typeDescription}</p>
        <p className="share-card__quote">&ldquo;{quote}&rdquo;</p>
      </div>
    </div>
  )
}

export default ShareCard
export type { ShareCardProps }
