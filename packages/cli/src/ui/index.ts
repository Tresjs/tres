import { bold, gray, red, stripColors } from 'kolorist'
import { amber, chip, enableColorOnStderr, glyph, green, mark } from './theme'

export { mascot, type Mood, pickMood } from './mascot'

enableColorOnStderr()

const HIDE_CURSOR = '\u001B[?25l'
const SHOW_CURSOR = '\u001B[?25h'
const CLEAR_LINE = '\r\u001B[2K'

/** Width of the phase-name column, so details line up down the run. */
const LABEL = 12
const MAX_WIDTH = 76
const FRAME_MS = 80
/** A narrow terminal still gets one item per line rather than a character-by-character column. */
const MIN_LIST_WIDTH = 20

const startedAt = performance.now()

/** At most one spinner runs at a time; other output has to step around it. */
let spinner: { clear: () => void, repaint: () => void } | null = null
let handlersInstalled = false

/** Repainting needs a terminal that can take the cursor back. CI logs are append-only. */
function interactive(): boolean {
  return Boolean(process.stderr.isTTY) && !process.env.CI
}

function width(): number {
  return Math.min(process.stderr.columns || MAX_WIDTH, MAX_WIDTH)
}

/** Pad against the visible text: the escape codes have no width on screen. */
function alignRight(left: string, right: string): string {
  const visible = stripColors(left).length + stripColors(right).length
  return left + ' '.repeat(Math.max(1, width() - visible)) + right
}

function elapsed(from: number): string {
  const ms = performance.now() - from
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
}

/** Everything decorative goes to stderr, so stdout carries nothing but the payload. */
function emit(line = ''): void {
  spinner?.clear()
  process.stderr.write(`${line}\n`)
  spinner?.repaint()
}

/** A killed run must not leave the terminal without a cursor. */
function installExitHandlers(): void {
  if (handlersInstalled) {
    return
  }
  handlersInstalled = true

  // Only wipe the line when a spinner is still on it. On a clean exit there is none, and
  // clearing anyway eats whatever the shell has already drawn.
  const restore = (): void => {
    const running = Boolean(spinner)
    spinner = null
    process.stderr.write(`${running ? CLEAR_LINE : ''}${SHOW_CURSOR}`)
  }

  process.on('exit', restore)
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      restore()
      process.exit(130)
    })
  }
}

export interface Task {
  /** Replace the text trailing the spinner. Ignored when not interactive. */
  update: (detail: string) => void
  succeed: (detail?: string) => void
  fail: (detail?: string) => void
}

/**
 * One phase of a run: a spinner while it works, a ticked line with its timing when it lands.
 * Off a TTY nothing is printed until it finishes, which keeps CI logs to one line per phase.
 */
export function task(label: string): Task {
  const started = performance.now()
  const name = bold(label.padEnd(LABEL))
  let detail = ''
  let frame = 0
  let timer: ReturnType<typeof setInterval> | undefined

  const paint = (): void => {
    process.stderr.write(`${CLEAR_LINE}${green(glyph.frames[frame])} ${name}${gray(detail)}`)
    frame = (frame + 1) % glyph.frames.length
  }

  if (interactive()) {
    installExitHandlers()
    process.stderr.write(HIDE_CURSOR)
    spinner = { clear: () => process.stderr.write(CLEAR_LINE), repaint: () => timer && paint() }
    paint()
    timer = setInterval(paint, FRAME_MS)
    timer.unref()
  }

  const finish = (mark: string, text: string): void => {
    if (timer) {
      clearInterval(timer)
      timer = undefined
      spinner = null
      process.stderr.write(`${CLEAR_LINE}${SHOW_CURSOR}`)
    }
    emit(alignRight(`${mark} ${name}${text}`, gray(elapsed(started))))
  }

  return {
    update: (text) => {
      detail = text
      if (timer) {
        paint()
      }
    },
    succeed: (text = '') => finish(green(glyph.ok), text),
    fail: (text = '') => finish(red(glyph.fail), text),
  }
}

/**
 * Run `work` as one phase. The spinner is stopped either way, so a thrown error never
 * leaves one turning over the failure message.
 */
export async function phase<T>(
  label: string,
  work: (task: Task) => T | Promise<T>,
  detail: (result: T) => string = () => '',
): Promise<T> {
  const running = task(label)
  try {
    const result = await work(running)
    running.succeed(detail(result))
    return result
  }
  catch (error) {
    running.fail()
    throw error
  }
}

/** `▲ ■ ● Tres  gltf  Robot.glb` — the one-line header every real invocation gets. */
export function header(command: string, subject?: string): void {
  emit()
  emit([mark(), chip(command), subject && gray(subject)].filter(Boolean).join('  '))
  emit()
}

export function blank(): void {
  emit()
}

export function success(text: string): void {
  emit(`${green(glyph.ok)} ${text}`)
}

export function note(text: string): void {
  emit(gray(`  ${text}`))
}

/**
 * A labelled comma list, wrapped to the terminal and hung under its first item. Past `limit`
 * the tail collapses to a count and the flag that prints the rest, so a 60-slot model does not
 * bury the paths above it.
 */
export function list(label: string, items: string[], limit = Number.POSITIVE_INFINITY): void {
  if (!items.length) {
    return
  }

  const shown = items.slice(0, limit)
  const hidden = items.length - shown.length
  const head = `  ${label}  `
  const hang = ' '.repeat(head.length)
  const room = Math.max(MIN_LIST_WIDTH, width() - head.length)

  const lines: string[] = []
  let line = ''
  shown.forEach((item, index) => {
    const piece = index < shown.length - 1 || hidden ? `${item},` : item
    if (!line) {
      line = piece
    }
    else if (line.length + 1 + piece.length <= room) {
      line += ` ${piece}`
    }
    else {
      lines.push(line)
      line = piece
    }
  })
  lines.push(line)

  emit(gray(head + lines[0]))
  for (const rest of lines.slice(1)) {
    emit(gray(hang + rest))
  }
  if (hidden) {
    emit(gray(`${hang}… ${hidden} more — rerun with --verbose`))
  }
}

export function warn(text: string): void {
  emit(`${amber(glyph.warn)} ${text}`)
}

/** The first line is the failure; anything after it is the hint that goes with it. */
export function fail(error: unknown): void {
  const [message, ...rest] = (error instanceof Error ? error.message : String(error)).split('\n')
  emit()
  emit(`${red(glyph.fail)} ${message}`)
  for (const line of rest) {
    note(line.trim())
  }
  emit()
}

export function done(): void {
  emit()
  emit(gray(`Done in ${elapsed(startedAt)}`))
}

/** The command's actual output: JSON, generated code, bananas. Never decorated. */
export function payload(text: string): void {
  process.stdout.write(`${text}\n`)
}
