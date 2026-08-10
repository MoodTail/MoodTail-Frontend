import type { CharacterType } from './characters'

export type ProfileAvatarStyle = { scale: number; x: number; y: number }

export const PROFILE_AVATAR_STYLES: Record<CharacterType, ProfileAvatarStyle> = {
  'easygoing-optimist': { scale: 1.3, x: -3, y: 20 },
  'free-spirited-romantic': { scale: 1.9, x: 5, y: 25 },
  'refreshing-explorer': { scale: 1.5, x: -6, y: 50 },
  'passionate-challenger': { scale: 1.1, x: 6, y: 30 },
  'grounded-realist': { scale: 0.98, x: 0, y: 35 },
  'emotional-thinker': { scale: 1.05, x: 2, y: 33 },
  'explosive-adventurer': { scale: 1.57, x: 0, y: 5 },
  'meticulous-critic': { scale: 1.1, x: 5, y: 50 },
  'sensitive-perfectionist': { scale: 1.25, x: 0, y: 26 },
  'steadfast-principlist': { scale: 1.15, x: 0, y: 25 },
  'quiet-supporter': { scale: 1.15, x: 0, y: 40 },
  'balanced-mediator': { scale: 1.3, x: 0, y: 24 },
}
