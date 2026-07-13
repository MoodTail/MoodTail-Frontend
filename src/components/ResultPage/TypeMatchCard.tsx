import '../../styles/TypeMatchCard.css'

interface TypeMatchCardProps {
  label: string
  typeName: string
  typeNameColor: string
  image: string
}

function TypeMatchCard({ label, typeName, typeNameColor, image }: TypeMatchCardProps) {
  return (
    <div className="type-match-card">
      <p className="type-match-card__label">{label}</p>
      <img className="type-match-card__image" src={image} alt="" />
      <p className="type-match-card__name" style={{ color: typeNameColor }}>
        {typeName}
      </p>
    </div>
  )
}

export default TypeMatchCard
export type { TypeMatchCardProps }
