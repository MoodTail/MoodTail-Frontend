import { useEffect, useState, type CSSProperties } from 'react'
import chevronLeftIcon from '../../assets/icons/chevron-left-white.svg'
import shareIcon from '../../assets/icons/share.svg'
import RadarChart, { type RadarChartData } from '../../components/ResultPage/RadarChart'
import CocktailTopList, { type CocktailTopItem } from '../../components/ResultPage/CocktailTopList'
import TypeMatchCard from '../../components/ResultPage/TypeMatchCard'
import TwoButtonModal from '../../components/common/modal/TwoButtonModal'
import ResultShareModal from '../../components/common/modal/ResultShareModal'
import ResultSnsShareModal from '../../components/common/modal/ResultSnsShareModal'
import SaveCompleteToast from '../../components/common/SaveCompleteToast'
import { RESULT_TYPE_THEMES, type ResultTypeTheme } from '../../constants/resultTypeThemes'
import { CHARACTER_TYPES, getCharacterMatch, type CharacterType } from '../../data/characterType'
import { LOCAL_TYPE_TO_TYPECODE, TYPECODE_TO_LOCAL_TYPE } from '../../data/typeCodeMapping'
import romanticCharacterImg from '../../assets/images/character/character-12.png'
import glass1 from '../../assets/images/glass/glass-1.png'
import glass2 from '../../assets/images/glass/glass-2.png'
import glass3 from '../../assets/images/glass/glass-3.png'
import glass4 from '../../assets/images/glass/glass-4.png'
import { saveMoodTestResult } from '../../api/mood-tests/moodTests.api'
import type { MoodTestResult } from '../../api/mood-tests/moodTests.types'
import '../../styles/ResultPage.css'

// TODO: 실제 테스트 결과 API 연동 후 실제 응답으로 대체
const MOCK_RESULT = {
  characterImage: romanticCharacterImg,
  typeName: '자유로운 탐험가',
  typeDescription: '작은 순간도 특별한 추억으로 만드는 타입',
  shareDescription: '작은 순간도 특별한 추억으로', // 공유 카드용 축약 문구
  quote: "안 마셔본거? 그걸로!!",
  // TODO: 실제 카피 확정되면 교체
  detailDescription:
    '자유로운 탐험가 오늘은 상그리아, 내일은 모스코 뮬. 탄산처럼 톡 튀는 취향이라 메뉴판을 다 읽어봐야 직성이 풀려요. 우산 꽂힌 트로피컬 잔처럼 어디서든 분위기를 만들어내고, 정해진 루트 없이 흘러가는 게 오히려 제일 자연스러운 타입이에요. 예측이 안 되는 게 매력이라는 걸 본인도 알고 있어요.',
  matchPercent: 68,
}

// PREVIEW_TYPE_CODE: 실제 테스트 결과(result prop)가 없을 때(로컬에서 화면 미리보기/작업할 때)만 쓰는 폴백.
// 실제 결과가 있으면 그 typeCode로 RESULT_TYPE_THEMES를 찾아 씀
const PREVIEW_TYPE_CODE = 'balanced-mediator'
// FORCE_PREVIEW_TYPE: true면 실제 퀴즈 결과와 상관없이 항상 PREVIEW_TYPE_CODE 테마로 보여줌
// (타입별 화면 작업/확인용). 작업 다 끝나면 false로 바꿔서 실제 결과 typeCode를 쓰게 해야 함
const FORCE_PREVIEW_TYPE = false
// PREVIEW_USE_BACKEND_IMAGE: true면 미리보기 중에도 캐릭터만 로컬 대신 실제 백엔드 이미지로 봄.
// 퀴즈를 안 풀어도 "배경(로컬 테마) + 실제 백엔드 캐릭터 이미지" 조합이 맞는지 바로 확인할 때 씀.
// 주의: S3 파일명이 typeCode와 같다는 규칙(https://.../mood-types/{typeCode}.png)은 실제로 떠보고
// 확인한 것일 뿐 백엔드에서 공식 문서화된 건 아니라서, 미리보기 확인용으로만 쓰고 다른 곳엔 쓰지 말 것
const PREVIEW_USE_BACKEND_IMAGE = false
const PREVIEW_BACKEND_IMAGE_URL = `https://moodtail-bucket.s3.ap-southeast-2.amazonaws.com/public/mood-types/${PREVIEW_TYPE_CODE}.png`

// FORCE_PREVIEW_MATCH: true면 "잘 맞는/안 맞는 타입" 카드도 실제 결과와 상관없이 아래 두 typeCode로
// 강제로 보여줌 (카드 크롭/레이아웃 확인용). 실제 API 데이터(취향분석 등)는 그대로 진짜 결과를 씀.
// 확인 다 끝나면 false로 꼭 되돌려야 함
const FORCE_PREVIEW_MATCH = false
const PREVIEW_GOOD_MATCH_TYPE_CODE = 'refreshing-explorer'
const PREVIEW_BAD_MATCH_TYPE_CODE = 'free-spirited-romantic'

// 백엔드 typeCode(예: 'easygoing-optimist') -> 로컬 캐릭터 id -> CharacterType(이름/네임태그 색) 순으로 찾음.
// 매핑에 없는 typeCode면 undefined (FitUnfitCard/NameTag는 undefined를 안전하게 처리함)
function resolveCharacterType(typeCode?: string): CharacterType | undefined {
  if (!typeCode) return undefined
  const localId = TYPECODE_TO_LOCAL_TYPE[typeCode]
  if (!localId) return undefined
  return CHARACTER_TYPES.find((t) => t.id === localId)
}

// wrap 안에서는 무늬(backgroundShape) 하나만 가운데 정렬하는 게 아니라, 캐릭터/보조무늬까지
// 합친 전체 구성(bounding box)이 가운데 오도록 계산함 (캐릭터/보조무늬가 무늬 밖으로
// 삐져나가는 만큼 무게중심이 한쪽으로 쏠리기 때문)
function getContentBounds(theme?: ResultTypeTheme) {
  if (!theme?.backgroundShapeWidth || !theme?.backgroundShapeHeight) {
    return { left: 0, top: 0, right: 0, bottom: 0 }
  }
  let left = 0
  let top = 0
  let right = theme.backgroundShapeWidth
  let bottom = theme.backgroundShapeHeight

  if (theme.characterLayout === 'positioned') {
    const charLeft = theme.characterPositionLeft ?? 0
    const charTop = theme.characterPositionTop ?? 0
    left = Math.min(left, charLeft)
    top = Math.min(top, charTop)
    right = Math.max(right, charLeft + (theme.characterPositionWidth ?? 0))
    bottom = Math.max(bottom, charTop + (theme.characterPositionHeight ?? 0))
  }
  if (theme.accentShape) {
    const accentLeft = theme.accentShapeLeft ?? 0
    const accentTop = theme.accentShapeTop ?? 0
    left = Math.min(left, accentLeft)
    top = Math.min(top, accentTop)
    right = Math.max(right, accentLeft + (theme.accentShapeWidth ?? 0))
    bottom = Math.max(bottom, accentTop + (theme.accentShapeHeight ?? 0))
  }
  theme.extraShapes?.forEach((shape) => {
    left = Math.min(left, shape.left)
    top = Math.min(top, shape.top)
    right = Math.max(right, shape.left + shape.width)
    bottom = Math.max(bottom, shape.top + shape.height)
  })
  return { left, top, right, bottom }
}

// TODO: glass-*.png 파일명이 번호로만 되어 있어 모양으로 임의 매핑함. 실제 칵테일-잔 매핑 확정되면 교체
const MOCK_TOP_COCKTAILS: CocktailTopItem[] = [
  { rank: 1, name: '선셋 피즈', matchRate: 95, glassImage: glass4 },
  { rank: 2, name: '모히토', matchRate: 75, glassImage: glass3 },
  { rank: 3, name: '피나콜라다', matchRate: 55, glassImage: glass2 },
  { rank: 4, name: '진토닉', matchRate: 25, glassImage: glass1 },
]

const MOCK_MY_TASTE: RadarChartData = { 당도: 30, 산도: 70, 쓴맛: 20, 청량감: 90, 도수: 45 }

// TODO: 활성(active) 여부는 아직 데이터 기반 규칙이 없어 목데이터 기준으로 고정함. 실제 기준 정해지면 교체
const TASTE_CHIP_ORDER: { key: keyof RadarChartData; label: string; active: boolean }[] = [
  { key: '도수', label: '도수', active: true },
  { key: '당도', label: '당도', active: false },
  { key: '산도', label: '산도', active: true },
  { key: '쓴맛', label: '쓴맛', active: false },
  { key: '청량감', label: '청량감', active: true },
]

type ModalStep = 'none' | 'save-overwrite-warning' | 'login-required' | 'back-confirm'

interface ResultPageProps {
  isLoggedIn?: boolean
  // 실제 테스트 제출(POST /api/v1/tests/results) 응답. 없으면 목데이터로 보여줍니다.
  result?: MoodTestResult | null
  // TODO: react-router-dom 도입되면 이 prop 대신 라우팅으로 대체
  onBack?: () => void
  onRetest?: () => void
  onGoToLogin?: () => void
}

function ResultPage({
  isLoggedIn = true,
  result = null,
  onBack,
  onRetest,
  onGoToLogin,
}: ResultPageProps) {
  // TODO: 실제 저장 상태 API 연동 후 아래 mock state를 실제 값으로 교체
  const [saveStatusOverride, setSaveStatusOverride] = useState<boolean | null>(null)
  const isResultSaved = saveStatusOverride ?? Boolean(result?.saved || result?.resultId) // 지금 보고 있는 결과를 저장했는지

  // typeCode로 로컬 테마(캐릭터/배경무늬/카피)를 찾음. 실제 결과가 있으면 그 typeCode를,
  // 없으면(로컬 미리보기) PREVIEW_TYPE_CODE를 씀. 아직 테마가 없는 타입(easygoing-optimist 등)은
  // theme이 undefined가 되고, 이때는 API 응답값 -> 목데이터 순으로 폴백.
  // FORCE_PREVIEW_TYPE이 true면 실제 결과가 있어도 무시하고 항상 PREVIEW_TYPE_CODE로 봄
  const typeCode = FORCE_PREVIEW_TYPE ? PREVIEW_TYPE_CODE : (result?.moodType.typeCode ?? PREVIEW_TYPE_CODE)
  const theme = RESULT_TYPE_THEMES[typeCode]

  const wrapWidth = theme?.wrapWidth ?? 355
  const wrapHeight = theme?.wrapHeight ?? 355
  const contentBounds = getContentBounds(theme)
  const shapeOffsetX =
    (wrapWidth - (contentBounds.right - contentBounds.left)) / 2 -
    contentBounds.left +
    (theme?.contentOffsetX ?? 0)
  const shapeOffsetY =
    (wrapHeight - (contentBounds.bottom - contentBounds.top)) / 2 -
    contentBounds.top +
    (theme?.contentOffsetY ?? 0)

  // result가 있으면(실제 테스트를 막 완료한 경우) 그 값을, 없으면 목데이터를 사용합니다.
  // 캐릭터 이미지는 백엔드 characterImageUrl을 최우선으로 씀 (로컬 PNG랑 픽셀 단위로 동일함을 확인함).
  // 단, FORCE_PREVIEW_TYPE으로 타입을 강제 지정했을 때는 실제 result의 typeCode가 다를 수 있어
  // 이미지-배경-카피가 서로 다른 타입으로 섞이지 않도록 로컬 테마 이미지를 그대로 씀
  // 이름/문구는 디자인팀에게 받은 로컬 테마(theme)가 있으면 그걸 최우선으로 씁니다.
  // matchPercent(이 타입이 나온 사용자 비율)는 API가 내려주면 그 값을 쓰고, 없으면 목데이터 값을 씁니다.
  const characterImage = FORCE_PREVIEW_TYPE
    ? (PREVIEW_USE_BACKEND_IMAGE ? PREVIEW_BACKEND_IMAGE_URL : theme?.characterImage ?? MOCK_RESULT.characterImage)
    : result?.moodType.characterImageUrl ?? theme?.characterImage ?? MOCK_RESULT.characterImage
  const shareCardCharacterImage = theme?.characterImage ?? characterImage
  const typeName = theme?.name ?? result?.moodType.name ?? MOCK_RESULT.typeName
  const typeDescription = theme?.description ?? result?.moodType.shortDescription ?? MOCK_RESULT.typeDescription
  const quote = theme?.quote ?? result?.moodType.characterQuote ?? MOCK_RESULT.quote
  const detailDescription = theme?.detailDescription ?? result?.moodType.shortDescription ?? MOCK_RESULT.detailDescription
  const shareDescription = theme?.description ?? result?.moodType.shortDescription ?? MOCK_RESULT.shareDescription
  const matchPercent = FORCE_PREVIEW_TYPE ? MOCK_RESULT.matchPercent : (result?.moodType.matchPercent ?? MOCK_RESULT.matchPercent)

  const topCocktails: CocktailTopItem[] = result
    ? result.recommendations.map((r) => ({
        rank: r.ranking,
        name: r.nameKo,
        matchRate: r.matchScore,
        glassImage: r.imageUrl,
      }))
    : MOCK_TOP_COCKTAILS

  const myTaste: RadarChartData = result
    ? {
        당도: result.displayTasteScores.sweetness,
        산도: result.displayTasteScores.sourness,
        쓴맛: result.displayTasteScores.bitterness,
        청량감: result.displayTasteScores.refreshing,
        도수: result.displayTasteScores.alcoholIntensity,
      }
    : MOCK_MY_TASTE
  const shareTasteProfile = result?.tasteProfile ?? {
    alcoholIntensity: MOCK_MY_TASTE.도수,
    sweetness: MOCK_MY_TASTE.당도,
    sourness: MOCK_MY_TASTE.산도,
    refreshing: MOCK_MY_TASTE.청량감,
    bitterness: MOCK_MY_TASTE.쓴맛,
  }

  const currentCharacterType = resolveCharacterType(typeCode)
  const fallbackMatch = currentCharacterType ? getCharacterMatch(currentCharacterType.id) : {}
  const fallbackGoodMatchTypeCode = fallbackMatch.good ? LOCAL_TYPE_TO_TYPECODE[fallbackMatch.good.id] : undefined
  const fallbackBadMatchTypeCode = fallbackMatch.bad ? LOCAL_TYPE_TO_TYPECODE[fallbackMatch.bad.id] : undefined
  const goodMatch = result?.compatibilities.best
  const badMatch = result?.compatibilities.worst
  const goodMatchTypeCode = FORCE_PREVIEW_MATCH
    ? PREVIEW_GOOD_MATCH_TYPE_CODE
    : goodMatch?.typeCode ?? fallbackGoodMatchTypeCode
  const badMatchTypeCode = FORCE_PREVIEW_MATCH
    ? PREVIEW_BAD_MATCH_TYPE_CODE
    : badMatch?.typeCode ?? fallbackBadMatchTypeCode
  const goodMatchType = resolveCharacterType(goodMatchTypeCode)
  const badMatchType = resolveCharacterType(badMatchTypeCode)
  // 미리보기 강제 지정 중이면 실제 API 이미지 대신 로컬 테마 캐릭터 이미지를 씀
  const goodMatchImage = FORCE_PREVIEW_MATCH
    ? RESULT_TYPE_THEMES[PREVIEW_GOOD_MATCH_TYPE_CODE]?.characterImage
    : goodMatch?.characterImageUrl ?? (goodMatchTypeCode ? RESULT_TYPE_THEMES[goodMatchTypeCode]?.characterImage : undefined)
  const badMatchImage = FORCE_PREVIEW_MATCH
    ? RESULT_TYPE_THEMES[PREVIEW_BAD_MATCH_TYPE_CODE]?.characterImage
    : badMatch?.characterImageUrl ?? (badMatchTypeCode ? RESULT_TYPE_THEMES[badMatchTypeCode]?.characterImage : undefined)
  const goodMatchImageScale = goodMatchTypeCode ? RESULT_TYPE_THEMES[goodMatchTypeCode]?.matchCardImageScale : undefined
  const badMatchImageScale = badMatchTypeCode ? RESULT_TYPE_THEMES[badMatchTypeCode]?.matchCardImageScale : undefined
  const goodMatchImageOffsetY = goodMatchTypeCode ? RESULT_TYPE_THEMES[goodMatchTypeCode]?.matchCardImageOffsetY : undefined
  const badMatchImageOffsetY = badMatchTypeCode ? RESULT_TYPE_THEMES[badMatchTypeCode]?.matchCardImageOffsetY : undefined

  const [modalStep, setModalStep] = useState<ModalStep>('none')
  const closeModal = () => setModalStep('none')

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSnsModalOpen, setIsSnsModalOpen] = useState(false)
  const [isSaveToastVisible, setIsSaveToastVisible] = useState(false)
  const [isSaveResultToastVisible, setIsSaveResultToastVisible] = useState(false)
  const [saveResultToastMessage, setSaveResultToastMessage] = useState('저장 완료되었습니다')
  const [shareUrl, setShareUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isSaveResultToastVisible) return
    const timer = setTimeout(() => setIsSaveResultToastVisible(false), 1500)
    return () => clearTimeout(timer)
  }, [isSaveResultToastVisible])

  const goBack = () => {
    if (onBack) {
      onBack()
      return
    }
    // TODO: react-router-dom 도입 후 이전 화면으로 돌아가는 라우팅 연결
    console.log('TODO: 이전 화면으로 이동')
  }

  const handleBack = () => {
    if (!isResultSaved) {
      setModalStep('back-confirm')
      return
    }
    goBack()
  }

  const handleRetest = () => {
    if (onRetest) {
      onRetest()
      return
    }
    // TODO: react-router-dom 도입 후 테스트 화면으로 라우팅 연결
    console.log('TODO: 테스트 다시 시작')
  }

  const performSave = async () => {
    setModalStep('none')

    if (!result || result.recommendations.length !== 4) {
      setSaveStatusOverride(false)
      setSaveResultToastMessage('저장할 테스트 결과가 없습니다')
      setIsSaveResultToastVisible(true)
      return
    }

    try {
      await saveMoodTestResult({
        moodType: { moodTypeId: result.moodType.moodTypeId, typeCode: result.moodType.typeCode },
        tasteProfile: result.tasteProfile,
        recommendedCocktails: result.recommendations.map((r) => ({
          cocktailId: r.cocktailId,
          matchScore: r.matchScore,
        })),
      })
      setSaveStatusOverride(true)
      setSaveResultToastMessage('저장 완료되었습니다')
    } catch (err) {
      console.error('테스트 결과 저장에 실패했습니다', err)
      setSaveStatusOverride(false)
      setSaveResultToastMessage('저장에 실패했습니다')
    }
    setIsSaveResultToastVisible(true)
  }

  const handleSaveResult = () => {
    if (!isLoggedIn) {
      setModalStep('login-required')
      return
    }
    if (isResultSaved || result?.saved || result?.resultId) {
      setModalStep('save-overwrite-warning')
      return
    }
    performSave()
  }

  const handleGoToLogin = () => {
    closeModal()
    if (onGoToLogin) {
      onGoToLogin()
      return
    }
    // TODO: react-router-dom 도입 후 로그인 페이지로 라우팅 연결
    console.log('TODO: 로그인 페이지로 이동')
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  const handleSnsShare = (generatedShareUrl?: string) => {
    setShareUrl(generatedShareUrl ?? null)
    setIsSnsModalOpen(true)
  }

  const handleKakaoShare = () => {
    console.log('카카오톡 공유 데이터가 아직 준비되지 않았습니다.')
  }

  const handleImageSaved = () => {
    setIsSaveToastVisible(true)
  }

  return (
    <>
      <div className="result-page">
        <header
          className="result-page__header"
          style={
            theme
              ? ({
                  background: theme.backgroundColor,
                  '--color-primary': theme.accentColor,
                } as CSSProperties)
              : undefined
          }
        >
          {theme?.decorativeSquares?.map((square, index) => (
            <div
              key={index}
              className="result-page__decorative-square"
              aria-hidden="true"
              style={{
                top: `${square.top}px`,
                left: `${square.left}px`,
                width: `${square.size}px`,
                height: `${square.size}px`,
                borderRadius: square.radius !== undefined ? `${square.radius}px` : undefined,
                transform: `rotate(${square.rotation}deg)`,
              }}
            />
          ))}
          <button
            type="button"
            className="result-page__back"
            onClick={handleBack}
          >
            <img className="result-page__back-icon" src={chevronLeftIcon} alt="" aria-hidden="true" />
            <span className="result-page__back-label">홈으로 돌아가기</span>
          </button>

          <div
            className="result-page__character-wrap"
            style={{ width: `${wrapWidth}px`, height: `${wrapHeight}px` }}
          >
            {theme?.backgroundShape ? (
              <img
                className="result-page__background-shape"
                style={{
                  top: `${shapeOffsetY + (theme.backgroundShapeOffsetY ?? 0)}px`,
                  left: `${shapeOffsetX + (theme.backgroundShapeOffsetX ?? 0)}px`,
                  width: theme.backgroundShapeWidth ? `${theme.backgroundShapeWidth}px` : undefined,
                  height: theme.backgroundShapeHeight ? `${theme.backgroundShapeHeight}px` : undefined,
                }}
                src={theme.backgroundShape}
                alt=""
                aria-hidden="true"
              />
            ) : (
              !theme?.hideBackgroundCircle && (
                <div className="result-page__background-circle" aria-hidden="true" />
              )
            )}
            {theme?.accentShape && (
              <img
                className="result-page__accent-shape"
                style={{
                  top: `${shapeOffsetY + (theme.accentShapeTop ?? 0)}px`,
                  left: `${shapeOffsetX + (theme.accentShapeLeft ?? 0)}px`,
                  width: theme.accentShapeWidth ? `${theme.accentShapeWidth}px` : undefined,
                  height: theme.accentShapeHeight ? `${theme.accentShapeHeight}px` : undefined,
                }}
                src={theme.accentShape}
                alt=""
                aria-hidden="true"
              />
            )}
            {theme?.extraShapes?.map((shape, index) => (
              <img
                key={`${shape.src}-${index}`}
                className="result-page__extra-shape"
                style={{
                  top: `${shapeOffsetY + shape.top}px`,
                  left: `${shapeOffsetX + shape.left}px`,
                  width: `${shape.width}px`,
                  height: `${shape.height}px`,
                }}
                src={shape.src}
                alt=""
                aria-hidden="true"
              />
            ))}
            <img
              className={`result-page__character${
                theme?.characterLayout === 'positioned' ? ' result-page__character--positioned' : ''
              }`}
              style={
                theme?.characterLayout === 'positioned'
                  ? {
                      top: `${shapeOffsetY + (theme.characterPositionTop ?? 0)}px`,
                      left: `${shapeOffsetX + (theme.characterPositionLeft ?? 0)}px`,
                      width: theme.characterPositionWidth ? `${theme.characterPositionWidth}px` : undefined,
                      height: theme.characterPositionHeight ? `${theme.characterPositionHeight}px` : undefined,
                      filter: theme.characterShadowNone ? 'none' : theme.characterShadow,
                    }
                  : {
                      ...(theme?.characterWidth ? { width: `${theme.characterWidth}px` } : {}),
                      ...(theme?.characterShadowNone
                        ? { filter: 'none' }
                        : theme?.characterShadow
                          ? { filter: theme.characterShadow }
                          : {}),
                      ...(theme?.characterOffsetX || theme?.characterOffsetY
                        ? {
                            transform: `translate(${theme?.characterOffsetX ?? 0}px, ${
                              theme?.characterOffsetY ?? 0
                            }px)`,
                          }
                        : {}),
                    }
              }
              src={characterImage}
              alt=""
            />
          </div>
          <p
            className="result-page__type-name"
            style={{
              ...(theme?.typeNameFontSize ? { fontSize: `${theme.typeNameFontSize}px` } : {}),
              ...(theme?.typeNameMarginTop ? { marginTop: `${theme.typeNameMarginTop}px` } : {}),
            }}
          >
            {typeName}
          </p>
          <p
            className="result-page__type-description"
            style={{
              ...(theme?.typeDescriptionFontSize ? { fontSize: `${theme.typeDescriptionFontSize}px` } : {}),
              ...(theme?.typeDescriptionMarginTop ? { marginTop: `${theme.typeDescriptionMarginTop}px` } : {}),
              ...(theme?.typeDescriptionColor ? { color: theme.typeDescriptionColor } : {}),
            }}
          >
            {typeDescription}
          </p>
          <p
            className="result-page__quote"
            style={theme?.quoteMarginTop ? { marginTop: `${theme.quoteMarginTop}px` } : undefined}
          >
            &ldquo;{quote}&rdquo;
          </p>

          <div className="result-page__detail-card">
            <p className="result-page__detail-title">{typeName}</p>
            <p className="result-page__detail-body">{detailDescription}</p>
            <p className="result-page__detail-percent">
              사용자의 {matchPercent}%가 이 타입이 나왔어요
            </p>
          </div>
        </header>

        <div className="result-page__sheet">
          <div className="result-page__sheet-handle" aria-hidden="true" />

          <section className="result-page__section">
            <h2 className="result-page__section-title result-page__section-title--cocktail">
              나와 일치하는 칵테일 TOP 4
            </h2>
            <CocktailTopList items={topCocktails} />
          </section>

          <section className="result-page__section">
            <h2 className="result-page__section-title result-page__section-title--taste">
              나의 취향 분석
            </h2>
            <RadarChart myData={myTaste} />
            <div className="taste-chips">
              {TASTE_CHIP_ORDER.map(({ key, label, active }) => (
                <div
                  key={key}
                  className={`taste-chips__item${active ? ' taste-chips__item--active' : ''}`}
                >
                  <span className="taste-chips__label">{label}</span>
                  <span className="taste-chips__value">{myTaste[key]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="result-page__match-section">
            <TypeMatchCard
              label="잘 맞는 타입"
              typeName={goodMatchType?.name ?? goodMatch?.name ?? ''}
              typeNameColor={goodMatchType?.color ?? '#fda8a8'}
              image={goodMatchImage}
              imageScale={goodMatchImageScale}
              imageOffsetY={goodMatchImageOffsetY}
            />
            <TypeMatchCard
              label="안 맞는 타입"
              typeName={badMatchType?.name ?? badMatch?.name ?? ''}
              typeNameColor={badMatchType?.color ?? '#6fa8dc'}
              image={badMatchImage}
              imageScale={badMatchImageScale}
              imageOffsetY={badMatchImageOffsetY}
            />
          </section>

          <div className="result-page__actions">
            {isSaveResultToastVisible ? (
              <div className="result-page__save-toast" role="status" aria-live="polite">
                {saveResultToastMessage}
              </div>
            ) : (
              <button type="button" className="result-page__retest" onClick={handleRetest}>
                다시 테스트하기
              </button>
            )}
            <button type="button" className="result-page__save" onClick={handleSaveResult}>
              테스트 결과 저장
            </button>

            <button type="button" className="result-page__share" onClick={handleShare}>
              <img className="result-page__share-icon" src={shareIcon} alt="" aria-hidden="true" />
              공유하기
            </button>
          </div>
        </div>
      </div>

      <TwoButtonModal
        isOpen={modalStep === 'save-overwrite-warning'}
        title="앗! 저장하기 전에"
        description={'이미 오늘 검사한 결과가 있는 사용자는\n지금 저장하게 되면 이전 결과는 사라집니다'}
        leftButton={{ label: '저장하기', onClick: performSave, variant: 'primary' }}
        rightButton={{ label: '닫기', onClick: closeModal, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <TwoButtonModal
        isOpen={modalStep === 'login-required'}
        title="로그인이 필요해요"
        description={'저장기능은 로그인 유저에게만 가능합니다\n로그인할까요?'}
        leftButton={{ label: '로그인', onClick: handleGoToLogin, variant: 'primary' }}
        rightButton={{ label: '닫기', onClick: closeModal, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <TwoButtonModal
        isOpen={modalStep === 'back-confirm'}
        title="뒤로가시겠어요?"
        description="테스트 결과는 저장되지 않습니다"
        leftButton={{ label: '저장하기', onClick: handleSaveResult, variant: 'primary' }}
        rightButton={{ label: '뒤로가기', onClick: () => { closeModal(); goBack(); }, variant: 'secondary' }}
        onOverlayClick={closeModal}
      />

      <ResultShareModal
        isOpen={isShareModalOpen}
        shareCard={{
          typeCode,
          characterImage: shareCardCharacterImage,
          typeName,
          typeDescription: shareDescription,
          quote,
        }}
        tasteProfile={shareTasteProfile}
        onClose={() => setIsShareModalOpen(false)}
        onSnsShare={handleSnsShare}
        onImageSaved={handleImageSaved}
      />

      <ResultSnsShareModal
        isOpen={isSnsModalOpen}
        url={shareUrl ?? ''}
        onClose={() => setIsSnsModalOpen(false)}
        onKakaoShare={handleKakaoShare}
        kakaoShare={{
          title: `MoodTail - ${typeName}`,
          description: shareDescription,
          imageUrl: characterImage,
          webUrl: shareUrl ?? '',
          buttonTitle: '결과 확인하기',
        }}
      />

      <SaveCompleteToast
        message="저장 완료되었습니다"
        isVisible={isSaveToastVisible}
        onHide={() => setIsSaveToastVisible(false)}
      />
    </>
  )
}

export default ResultPage
