import { ansi256, ansi256Bg, black, bold, gray, options, trueColor, trueColorBg } from 'kolorist'

/** kolorist scores terminals 0-3. Its enum is a `const enum`, so it cannot be imported. */
const ANSI_256 = 2
const TRUE_COLOR = 3

/**
 * The three brand colours, read off `apps/docs/public/logo.svg`.
 * kolorist's `trueColor` prints plain text rather than degrading on a 256-colour
 * terminal, so each one carries the nearest palette index as a fallback.
 */
function brand(rgb: [number, number, number], index: number, background = false) {
  const exact = background ? trueColorBg(...rgb) : trueColor(...rgb)
  const near = background ? ansi256Bg(index) : ansi256(index)
  return (text: string): string => (options.supportLevel >= TRUE_COLOR ? exact : near)(text)
}

export const green = brand([130, 219, 197], 116)
export const amber = brand([239, 172, 53], 221)
const greenBg = brand([130, 219, 197], 116, true)

/** Three shapes for "Tres", the mark without its wordmark. */
export function shapes(): string {
  return `${green('▲')} ${gray('■')} ${amber('●')}`
}

/** The brand mark, shared with `create-tres`: three shapes for "Tres". */
export function mark(): string {
  return `${shapes()} ${bold('Tres')}`
}

/** The command name knocked out of a brand-green chip. Brackets it when colour is unavailable. */
export function chip(text: string): string {
  return options.supportLevel >= ANSI_256 ? greenBg(black(bold(` ${text} `))) : `[${text}]`
}

export const glyph = {
  ok: '✔',
  fail: '✖',
  warn: '⚠',
  arrow: '›',
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
}

/**
 * kolorist samples `stdout` to decide whether colour is wanted, but every decorated line
 * here goes to `stderr`. Without this, `tres gltf x.glb --json > ir.json` strips the colour
 * from progress the user is still watching on screen.
 */
export function enableColorOnStderr(): void {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, COLORTERM } = process.env

  if (options.enabled || !process.stderr.isTTY) {
    return
  }
  if (NODE_DISABLE_COLORS || NO_COLOR || FORCE_COLOR === '0' || TERM === 'dumb') {
    return
  }

  options.enabled = true
  options.supportLevel = process.platform === 'win32' || COLORTERM === 'truecolor' || COLORTERM === '24bit'
    ? TRUE_COLOR
    : TERM?.endsWith('-256color') || TERM?.endsWith('256') ? ANSI_256 : 1
}
