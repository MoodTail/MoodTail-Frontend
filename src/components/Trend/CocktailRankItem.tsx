interface CocktailRankItemProps {
  rank: number;
  name: string;
  description: string;
  percent: number;
  color: string;
}

function CocktailRankItem({
  rank,
  name,
  description,
  percent,
  color,
}: CocktailRankItemProps) {
  return (
    <div className="cocktail-rank-item">
      <div className="cocktail-rank-item__badge" style={{ background: color }}>
        {rank}
      </div>
      <div className="cocktail-rank-item__text">
        <p className="cocktail-rank-item__name">{name}</p>
        <p className="cocktail-rank-item__description">{description}</p>
      </div>
      <span className="cocktail-rank-item__percent">{percent}%</span>
    </div>
  );
}

export default CocktailRankItem;
