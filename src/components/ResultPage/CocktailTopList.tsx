import '../../styles/CocktailTopList.css'

interface CocktailTopItem {
  rank: number
  name: string
  matchRate: number
  glassImage: string
}

interface CocktailTopListProps {
  items: CocktailTopItem[]
}

function CocktailTopList({ items }: CocktailTopListProps) {
  return (
    <div className="cocktail-top-list">
      {items.map((item) => (
        <div key={item.rank} className="cocktail-top-card">
          <span className="cocktail-top-card__rank">{item.rank}위</span>
          <img className="cocktail-top-card__glass" src={item.glassImage} alt="" />
          <p className="cocktail-top-card__name">{item.name}</p>
          <p className="cocktail-top-card__match">일치율 {item.matchRate}%</p>
        </div>
      ))}
    </div>
  )
}

export default CocktailTopList
export type { CocktailTopItem, CocktailTopListProps }
