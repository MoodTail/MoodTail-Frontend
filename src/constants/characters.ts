import idealistCharacter from '../assets/characters/idealist.svg'
import romanticCharacter from '../assets/characters/romantic.svg'
import visionaryCharacter from '../assets/characters/visionary.svg'
import disciplinarianCharacter from '../assets/characters/disciplinarian.svg'
import realistCharacter from '../assets/characters/realist.svg'
import melancholicCharacter from '../assets/characters/melancholic.svg'
import adventurerCharacter from '../assets/characters/adventurer.png'
import sharpCharacter from '../assets/characters/sharp.svg'
import analystCharacter from '../assets/characters/analyst.svg'
import stabilistCharacter from '../assets/characters/stabilist.svg'
import gentleCharacter from '../assets/characters/gentle.svg'
import pacifistCharacter from '../assets/characters/pacifist.svg'

// 백엔드 실제 typeCode(GET /api/v1/mood-types) 기준으로 키를 맞춤.
// 이미지/이름은 API의 characterImageUrl/name을 우선 사용하고, 아래 값들은
// (1) 프로필 상단 그라데이션 배경(API가 색상을 내려주지 않아 로컬에서 결정)
// (2) 대표 캐릭터 미설정/조회 실패 시 mock 폴백 용도로만 씀
export const CHARACTER_GRADIENTS = {
  'easygoing-optimist': 'linear-gradient(180.03deg, #DBDA87 -13.59%, #6FDCB3 14.35%, #F2E69E 89.4%)',
  'free-spirited-romantic': 'linear-gradient(180.03deg, #FFE176 -16.36%, #FF9458 39.07%, #FF6E0C 93.11%)',
  'refreshing-explorer': 'linear-gradient(180.03deg, #FDE5CA 18.98%, #FDA8A8 74.5%)',
  'passionate-challenger': 'linear-gradient(180.03deg, #E3F9F3 -13.59%, #FFDA61 18.29%, #FFDA61 82%, #FD7A15 98%)',
  'grounded-realist': 'linear-gradient(180.03deg, #1564FE 0.07%, #C9E0FF 90.61%)',
  'emotional-thinker': 'linear-gradient(180deg, #8ab7d4 0%, #457eab 35%, #457eab 65%, #a6d2ea 100%)',
  'explosive-adventurer': 'linear-gradient(180deg, #fca22b 0%, #fb3f11 35%, #fb3f11 65%, #f87909 100%)',
  'meticulous-critic': 'linear-gradient(180.03deg, #D18155 -3.65%, #9F2B03 14.35%, #CA6D30 92.41%)',
  'sensitive-perfectionist': 'linear-gradient(179.29deg, #FFEBE1 -16.72%, #FF682C 3.19%, #FD966D 55.75%, #FCB99E 90.83%)',
  'steadfast-principlist': 'linear-gradient(180.03deg, #508AF7 -3.7%, #E1ECF4 84.85%)',
  'quiet-supporter': 'linear-gradient(180deg, #fde3ad -30%, #21a26a 30%, #fde3ad 100%)',
  'balanced-mediator': 'linear-gradient(180deg, #fdf6e2 0%, #bde67a 35%, #bde67a 65%, #ceedb1 100%)',
} as const

export type CharacterType = keyof typeof CHARACTER_GRADIENTS

// mock 폴백 전용 로컬 이미지 (실제 캐릭터 이미지는 API의 characterImageUrl 사용)
export const CHARACTER_IMAGES: Record<CharacterType, string> = {
  'easygoing-optimist': idealistCharacter,
  'free-spirited-romantic': romanticCharacter,
  'refreshing-explorer': visionaryCharacter,
  'passionate-challenger': disciplinarianCharacter,
  'grounded-realist': realistCharacter,
  'emotional-thinker': melancholicCharacter,
  'explosive-adventurer': adventurerCharacter,
  'meticulous-critic': sharpCharacter,
  'sensitive-perfectionist': analystCharacter,
  'steadfast-principlist': stabilistCharacter,
  'quiet-supporter': gentleCharacter,
  'balanced-mediator': pacifistCharacter,
}

// mock 폴백 전용 로컬 라벨 (실제 이름은 API의 name 사용)
export const CHARACTER_LABELS: Record<CharacterType, string> = {
  'easygoing-optimist': '이상주의자',
  'free-spirited-romantic': '낭만주의자',
  'refreshing-explorer': '환상가',
  'passionate-challenger': '규칙주의자',
  'grounded-realist': '현실주의자',
  'emotional-thinker': '잔잔한 캐릭터',
  'explosive-adventurer': '열정적인 캐릭터',
  'meticulous-critic': '날카로운 캐릭터',
  'sensitive-perfectionist': '분석가',
  'steadfast-principlist': '안정주의자',
  'quiet-supporter': '부드러운 캐릭터',
  'balanced-mediator': '평화주의자',
}

export const CHARACTER_ORDER: CharacterType[] = [
  'easygoing-optimist',
  'free-spirited-romantic',
  'refreshing-explorer',
  'passionate-challenger',
  'grounded-realist',
  'emotional-thinker',
  'explosive-adventurer',
  'meticulous-critic',
  'sensitive-perfectionist',
  'steadfast-principlist',
  'quiet-supporter',
  'balanced-mediator',
]
