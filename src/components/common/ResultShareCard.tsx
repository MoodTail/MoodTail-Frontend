import passionateCardBg from '../../assets/images/share-card/passionate-card-bg.svg'
import passionateStar from '../../assets/images/share-card/passionate-star.svg'
import sparkleLarge from '../../assets/images/share-card/sparkle-large.svg'
import citrusSliceYellow from '../../assets/images/share-card/citrus-slice-yellow.svg'
import romanticCardBg from '../../assets/images/share-card/romantic-card-bg.svg'
import romanticCircle from '../../assets/images/share-card/romantic-circle.svg'
import citrusSliceOrange from '../../assets/images/share-card/citrus-slice-orange.svg'
import refreshingCardBg from '../../assets/images/share-card/refreshing-card-bg.svg'
import refreshingCloud from '../../assets/images/share-card/refreshing-cloud.svg'
import citrusSlicePink from '../../assets/images/share-card/citrus-slice-pink.svg'
import explosiveCardBg from '../../assets/images/share-card/explosive-card-bg.svg'
import explosiveStar from '../../assets/images/share-card/explosive-star.svg'
import explosiveFlame from '../../assets/images/share-card/explosive-flame.svg'
import sensitiveCardBg from '../../assets/images/share-card/sensitive-card-bg.svg'
import sensitiveFold from '../../assets/images/share-card/sensitive-fold.svg'
import sensitiveShard1 from '../../assets/images/share-card/sensitive-shard-1.svg'
import sensitiveShard2 from '../../assets/images/share-card/sensitive-shard-2.svg'
import sensitiveShard3 from '../../assets/images/share-card/sensitive-shard-3.svg'
import criticBean from '../../assets/images/share-card/critic-bean.svg'
import criticStarMedium1 from '../../assets/images/share-card/critic-star-medium-1.svg'
import criticStarMedium2 from '../../assets/images/share-card/critic-star-medium-2.svg'
import criticStarLarge from '../../assets/images/share-card/critic-star-large.svg'
import criticStarSmall from '../../assets/images/share-card/critic-star-small.svg'
import criticStarMain from '../../assets/images/share-card/critic-star-main.svg'
import criticCardBg from '../../assets/images/share-card/critic-card-bg.svg'
import emotionalCardBg from '../../assets/images/share-card/emotional-card-bg.svg'
import emotionalWave from '../../assets/images/share-card/emotional-wave.svg'
import emotionalGrape from '../../assets/images/share-card/emotional-grape.svg'
import principlistCardBg from '../../assets/images/share-card/principlist-card-bg.svg'
import principlistLines from '../../assets/images/share-card/principlist-lines.svg'
import principlistCherry from '../../assets/images/share-card/principlist-cherry.svg'
import realistCardBg from '../../assets/images/share-card/realist-card-bg.svg'
import realistCube from '../../assets/images/share-card/realist-cube.svg'
import realistRectMain from '../../assets/images/share-card/realist-rect-main.svg'
import realistRectBack from '../../assets/images/share-card/realist-rect-back.svg'
import realistRectSmall from '../../assets/images/share-card/realist-rect-small.svg'
import optimistCardBg from '../../assets/images/share-card/optimist-card-bg.svg'
import optimistCircles from '../../assets/images/share-card/optimist-circles.svg'
import optimistLime from '../../assets/images/share-card/optimist-lime.svg'
import supporterCardBg from '../../assets/images/share-card/supporter-card-bg.svg'
import supporterWave from '../../assets/images/share-card/supporter-wave.svg'
import supporterFruit from '../../assets/images/share-card/supporter-fruit.svg'
import mediatorCardBg from '../../assets/images/share-card/mediator-card-bg.svg'
import mediatorCircles from '../../assets/images/share-card/mediator-circles.svg'
import mediatorOlive from '../../assets/images/share-card/mediator-olive.svg'
import '../../styles/ResultShareCard.css'

interface ResultShareCardProps {
  typeCode?: string
  characterImage: string
  typeName: string
  typeDescription: string
  quote: string
}

const SHARE_CARD_THEMES = {
  'passionate-challenger': {
    className: 'result-share-card--passionate',
    cardBg: passionateCardBg,
    star: passionateStar,
    citrus: citrusSliceYellow,
    sparkles: [
      { src: sparkleLarge, className: 'result-share-card__sparkle result-share-card__sparkle--large' },
      { src: sparkleLarge, className: 'result-share-card__sparkle result-share-card__sparkle--medium' },
      { src: sparkleLarge, className: 'result-share-card__sparkle result-share-card__sparkle--small' },
      { src: sparkleLarge, className: 'result-share-card__sparkle result-share-card__sparkle--top-large' },
      { src: sparkleLarge, className: 'result-share-card__sparkle result-share-card__sparkle--top-small' },
    ],
  },
  'free-spirited-romantic': {
    className: 'result-share-card--romantic',
    cardBg: romanticCardBg,
    circle: romanticCircle,
    citrus: citrusSliceOrange,
    sparkles: [],
  },
  'refreshing-explorer': {
    className: 'result-share-card--refreshing',
    cardBg: refreshingCardBg,
    cloud: refreshingCloud,
    citrus: citrusSlicePink,
    sparkles: [],
  },
  'explosive-adventurer': {
    className: 'result-share-card--explosive',
    cardBg: explosiveCardBg,
    star: explosiveStar,
    citrus: explosiveFlame,
    sparkles: [],
  },
  'sensitive-perfectionist': {
    className: 'result-share-card--sensitive',
    cardBg: sensitiveCardBg,
    citrus: sensitiveFold,
    shards: [
      { src: sensitiveShard1, className: 'result-share-card__shard result-share-card__shard--sensitive-1' },
      { src: sensitiveShard2, className: 'result-share-card__shard result-share-card__shard--sensitive-2' },
      { src: sensitiveShard3, className: 'result-share-card__shard result-share-card__shard--sensitive-3' },
    ],
    sparkles: [],
  },
  'meticulous-critic': {
    className: 'result-share-card--critic',
    cardBg: criticCardBg,
    star: criticStarMain,
    citrus: criticBean,
    criticStars: [
      { src: criticStarLarge, className: 'result-share-card__critic-star result-share-card__critic-star--top-large' },
      { src: criticStarMedium1, className: 'result-share-card__critic-star result-share-card__critic-star--top-medium' },
      { src: criticStarSmall, className: 'result-share-card__critic-star result-share-card__critic-star--bottom-small' },
      { src: criticStarMedium2, className: 'result-share-card__critic-star result-share-card__critic-star--bottom-medium' },
      { src: criticStarLarge, className: 'result-share-card__critic-star result-share-card__critic-star--right-large' },
    ],
    sparkles: [],
  },
  'emotional-thinker': {
    className: 'result-share-card--emotional',
    cardBg: emotionalCardBg,
    cloud: emotionalWave,
    citrus: emotionalGrape,
    sparkles: [],
  },
  'steadfast-principlist': {
    className: 'result-share-card--principlist',
    cardBg: principlistCardBg,
    cloud: principlistLines,
    citrus: principlistCherry,
    sparkles: [],
  },
  'grounded-realist': {
    className: 'result-share-card--realist',
    cardBg: realistCardBg,
    citrus: realistCube,
    realistShapes: [
      { src: realistRectBack, className: 'result-share-card__realist-shape result-share-card__realist-shape--back' },
      { src: realistRectMain, className: 'result-share-card__realist-shape result-share-card__realist-shape--main' },
      { src: realistRectSmall, className: 'result-share-card__realist-shape result-share-card__realist-shape--small' },
    ],
    sparkles: [],
  },
  'easygoing-optimist': {
    className: 'result-share-card--optimist',
    cardBg: optimistCardBg,
    cloud: optimistCircles,
    citrus: optimistLime,
    sparkles: [],
  },
  'quiet-supporter': {
    className: 'result-share-card--supporter',
    cardBg: supporterCardBg,
    cloud: supporterWave,
    citrus: supporterFruit,
    sparkles: [],
  },
  'balanced-mediator': {
    className: 'result-share-card--mediator',
    cardBg: mediatorCardBg,
    cloud: mediatorCircles,
    citrus: mediatorOlive,
    sparkles: [],
  },
} as const

function ResultShareCard({ typeCode, characterImage, typeName, typeDescription, quote }: ResultShareCardProps) {
  const theme = typeCode ? SHARE_CARD_THEMES[typeCode as keyof typeof SHARE_CARD_THEMES] : undefined
  const themedClassName = theme ? ` result-share-card--themed ${theme.className}` : ''
  const displayDescription =
    typeCode === 'passionate-challenger'
      ? '달콤하고 상큼한 것에 끌리는, 언제나 먼저 달려가는 타입'
      : typeDescription
  const displayQuote = typeCode === 'passionate-challenger' ? '망설일 시간에 한 잔 더!' : quote

  const shareDescriptionByType: Record<string, string> = {
    'passionate-challenger': '달콤하고 상큼한 것에 끌리는, 언제나 먼저 달려가는 타입',
    'free-spirited-romantic': '탄산처럼 톡 튀고 다채로운, 어디서든 분위기를 만드는 타입',
    'refreshing-explorer': '시원한 호기심으로 새로운 즐거움을 찾아가는 타입',
    'explosive-adventurer': '강렬하고 극단적인, 한 번 꽂히면 끝까지 밀어붙이는 타입',
    'sensitive-perfectionist': '날카로운 산미처럼, 디테일 하나도 그냥 넘기지 않는 타입',
    'meticulous-critic': '작은 차이도 놓치지 않는, 자신만의 기준으로 맛을 살펴보는 타입',
    'emotional-thinker': '복잡하고 깊은 여운처럼, 혼자만의 세계에서 사색하는 타입',
    'steadfast-principlist': '쓴맛도 즐길 줄 아는, 타협 없이 자신의 기준을 지키는 타입',
    'grounded-realist': '클래식하고 깊은 맛처럼, 말보다 무게로 말하는 타입',
    'easygoing-optimist': '달콤하고 화사한 과일향처럼, 어디서나 따뜻한 기운을 주는 타입',
    'quiet-supporter': '부드러운 온기처럼, 곁에서 조용히 힘이 되어주는 타입',
    'balanced-mediator': '어느 한쪽으로 치우치지 않는, 모든 자리에 자연스럽게 녹아드는 타입',
  }
  const shareQuoteByType: Record<string, string> = {
    'passionate-challenger': '망설일 시간에 한 잔 더!',
    'free-spirited-romantic': '안 마셔본거? 그걸로!!',
    'refreshing-explorer': '가볍게 한 잔, 가볍게 한 걸음!',
    'explosive-adventurer': '한 번 시작했으면 끝까지!',
    'sensitive-perfectionist': '이 한 방울까지 계산된 선택이야',
    'meticulous-critic': '생각보다 재미있는 조합이네',
    'emotional-thinker': '기분을 이 잔에 담아둘래',
    'steadfast-principlist': '기준이 있어야 선택도 의미 있어',
    'grounded-realist': '묵직한 한 잔이 오래 남는 법이지.',
    'easygoing-optimist': '괜찮아, 결국엔 다 잘 풀릴거야!',
    'quiet-supporter': '말은 없어도 언제나 네 편이야',
    'balanced-mediator': '모두가 만족하는 한 잔이면 충분해',
  }
  const shareDescription = typeCode ? shareDescriptionByType[typeCode] ?? displayDescription : displayDescription
  const shareQuote = typeCode ? shareQuoteByType[typeCode] ?? displayQuote : displayQuote

  return (
    <div className={`result-share-card${themedClassName}`}>
      <div className="result-share-card__inner">
        {theme ? (
          <>
            {'cardBg' in theme ? (
              <img className="result-share-card__background" src={theme.cardBg} alt="" aria-hidden="true" />
            ) : (
              <div className="result-share-card__background" aria-hidden="true" />
            )}
            {'star' in theme ? <img className="result-share-card__star" src={theme.star} alt="" aria-hidden="true" /> : null}
            {typeCode === 'free-spirited-romantic' ? (
              <>
                {'circle' in theme ? <img className="result-share-card__circle" src={theme.circle} alt="" aria-hidden="true" /> : null}
                <span className="result-share-card__bubble result-share-card__bubble--top-small" aria-hidden="true" />
                <span className="result-share-card__bubble result-share-card__bubble--top-medium" aria-hidden="true" />
                <span className="result-share-card__bubble result-share-card__bubble--top-large" aria-hidden="true" />
                <span className="result-share-card__bubble result-share-card__bubble--bottom-small" aria-hidden="true" />
                <span className="result-share-card__bubble result-share-card__bubble--bottom-medium" aria-hidden="true" />
                <span className="result-share-card__bubble result-share-card__bubble--bottom-large" aria-hidden="true" />
              </>
            ) : null}
            {'cloud' in theme ? (
              <img className="result-share-card__cloud" src={theme.cloud} alt="" aria-hidden="true" />
            ) : null}
            {'shards' in theme
              ? theme.shards.map((shard) => (
                  <img key={shard.className} className={shard.className} src={shard.src} alt="" aria-hidden="true" />
                ))
              : null}
            {'criticStars' in theme
              ? theme.criticStars.map((star) => (
                  <img key={star.className} className={star.className} src={star.src} alt="" aria-hidden="true" />
                ))
              : null}
            {'realistShapes' in theme
              ? theme.realistShapes.map((shape) => (
                  <img key={shape.className} className={shape.className} src={shape.src} alt="" aria-hidden="true" />
                ))
              : null}
            <img className="result-share-card__citrus" src={theme.citrus} alt="" aria-hidden="true" />
            {theme.sparkles.map((sparkle) => (
              <img key={sparkle.className} className={sparkle.className} src={sparkle.src} alt="" aria-hidden="true" />
            ))}
          </>
        ) : (
          <div className="result-share-card__hill" aria-hidden="true" />
        )}
        <img className="result-share-card__character" src={characterImage} alt="" crossOrigin="anonymous" />
        <p className="result-share-card__type-name">{typeName}</p>
        <p className="result-share-card__type-description">{shareDescription}</p>
        <p className="result-share-card__quote">&ldquo;{shareQuote}&rdquo;</p>
      </div>
    </div>
  )
}

export default ResultShareCard
export type { ResultShareCardProps }
