import '../../styles/TypeMatchCard.css'

interface TypeMatchCardProps {
  label: string
  typeName: string
  typeNameColor: string
  image?: string
  // 이 캐릭터가 유독 작게 보일 때만 쓰는 예외적 확대 배율 (1 = 원본). 생략하면 확대 없음
  imageScale?: number
  // 캐릭터를 위/아래로 살짝 옮기고 싶을 때 (px, 음수면 위로). 생략하면 이동 없음
  imageOffsetY?: number
}

function TypeMatchCard({ label, typeName, typeNameColor, image, imageScale, imageOffsetY }: TypeMatchCardProps) {
  // CSS의 기본 transform(translateX(-50%), 가운데 정렬용)은 인라인 style로 덮으면 사라지므로,
  // 여기서 항상 translateX(-50%)를 맨 앞에 넣고 그 뒤에 scale/translateY를 이어붙임
  const transform = [
    'translateX(-50%)',
    imageScale ? `scale(${imageScale})` : '',
    imageOffsetY ? `translateY(${imageOffsetY}px)` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="type-match-card">
      <p className="type-match-card__label">{label}</p>
      <p className="type-match-card__name" style={{ color: typeNameColor }}>
        {typeName}
      </p>
      {image && <img className="type-match-card__image" src={image} alt="" style={{ transform }} />}
    </div>
  )
}

export default TypeMatchCard
export type { TypeMatchCardProps }
