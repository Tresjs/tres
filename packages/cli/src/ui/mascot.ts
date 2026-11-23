import { bold, gray } from 'kolorist'
import { shapes } from './theme'

const GAP = '   '

export type Mood = keyof typeof MOODS

/**
 * Eyes and mouth, both exactly 7 columns, dropped into the middle of the face. Everything
 * here is single-width; a wider glyph would push the aside out of line on that row alone.
 */
const MOODS = {
  neutral: ['●     ●', '───────'],
  happy: ['^     ^', '╰─────╯'],
  wink: ['●     ─', '╰─────╯'],
  excited: ['>     <', '   o   '],
  sleepy: ['─     ─', '───────'],
} as const

const VARIANTS = (Object.keys(MOODS) as Mood[]).filter(mood => mood !== 'neutral')

/** Neutral this often; the rest of the time one of the variants. */
const NEUTRAL_ODDS = 0.5

export function pickMood(random: () => number = Math.random): Mood {
  return random() < NEUTRAL_ODDS ? 'neutral' : VARIANTS[Math.floor(random() * VARIANTS.length)]
}

/** A rounded square, a forehead, and whichever face the mood asks for. */
function face(mood: Mood): string[] {
  const [eyes, mouth] = MOODS[mood]
  return [
    '╭───────────╮',
    '│           │',
    '│           │',
    `│  ${eyes}  │`,
    `│  ${mouth}  │`,
    '╰───────────╯',
  ]
}

/**
 * The landing screen, printed only above root help. Every other invocation gets the
 * one-line chip instead, so running the same command twenty times never scrolls.
 */
export function mascot(version: string, tagline: string, mood: Mood = pickMood()): string {
  // Two lines against six rows: 2 and 3 straddle the middle.
  const aside = ['', '', `${shapes()}  ${bold('Tres CLI')}  ${gray(`v${version}`)}`, gray(tagline), '', '']

  return face(mood)
    .map((line, index) => ` ${gray(line)}${aside[index] ? GAP + aside[index] : ''}`)
    .join('\n')
}
