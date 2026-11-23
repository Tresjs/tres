import { stripColors } from 'kolorist'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import * as ui from '.'

describe('ui', () => {
  const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)
  const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true)

  afterEach(() => {
    stdout.mockClear()
    stderr.mockClear()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  const chrome = () => stderr.mock.calls.flat().join('')
  const output = () => stdout.mock.calls.flat().join('')

  it('keeps every decorated line off stdout', () => {
    ui.header('gltf', 'robot.glb')
    ui.success('src/models/Robot.gen.vue')
    ui.note('2 slots')
    ui.warn('the url is a guess')
    ui.task('Parse').succeed('3 nodes')

    expect(output()).toBe('')
    expect(chrome()).toContain('▲ ■ ● Tres')
    expect(chrome()).toContain('gltf')
    expect(chrome()).toContain('robot.glb')
  })

  it('puts the payload on stdout undecorated', () => {
    ui.payload('{"nodes":{}}')

    expect(output()).toBe('{"nodes":{}}\n')
    expect(chrome()).toBe('')
  })

  it('reports a phase with its name, detail and timing', async () => {
    await ui.phase('Transform', () => 42, result => `${result} things`)

    expect(chrome()).toMatch(/✔ Transform\s+42 things\s+\d+m?s\n/)
  })

  it('marks a failed phase and lets the error through', async () => {
    await expect(ui.phase('Parse', () => {
      throw new Error('not a glb')
    })).rejects.toThrow('not a glb')

    expect(chrome()).toContain('✖ Parse')
  })

  it('renders the first line of an error as the failure and the rest as hints', () => {
    ui.fail(new Error('Cannot write to /src/models\nA leading slash is the filesystem root.'))

    expect(chrome()).toContain('✖ Cannot write to /src/models')
    expect(chrome()).toContain('  A leading slash is the filesystem root.')
  })

  it('wraps a list under a hanging indent instead of running off the terminal', () => {
    ui.list('slots', ['Cube_Prototype_Large_A-convcol', 'Primitive_Stairs_Half_Collision-convcolonly', 'Can_A-rigid'])

    const lines = chrome().trimEnd().split('\n')
    expect(lines.length).toBeGreaterThan(1)
    expect(lines.every(line => line.length <= 76)).toBe(true)
    expect(lines[0].startsWith('  slots  Cube_Prototype_Large_A-convcol,')).toBe(true)
    // Continuations align under the first name, not under the label.
    expect(lines[1].startsWith('         ')).toBe(true)
  })

  it('collapses a list past the limit and carries the caller-supplied hint', () => {
    ui.list('slots', ['One', 'Two', 'Three', 'Four'], 2, 'rerun with --verbose')

    expect(chrome()).toContain('  slots  One, Two,')
    expect(chrome()).toContain('… 2 more — rerun with --verbose')
    expect(chrome()).not.toContain('Three')
  })

  it('collapses without a hint when the caller has no way out to offer', () => {
    ui.list('slots', ['One', 'Two', 'Three'], 1)

    expect(chrome()).toContain('… 2 more\n')
  })

  it('runs registered cleanups on the way out, past a throwing one, and drops released ones', () => {
    const released = vi.fn()
    const kept = vi.fn()

    ui.onExit(() => {
      throw new Error('nothing left to unlink')
    })
    ui.onExit(released)()
    ui.onExit(kept)

    process.emit('exit', 0)

    expect(kept).toHaveBeenCalledTimes(1)
    expect(released).not.toHaveBeenCalled()
  })

  it('prints nothing for an empty list', () => {
    ui.list('slots', [])

    expect(chrome()).toBe('')
  })

  it('draws the mascot with the version and tagline beside it', () => {
    const art = ui.mascot('1.2.3', 'CLI for TresJS projects', 'neutral')

    expect(art.split('\n')).toHaveLength(6)
    expect(art).toContain('●     ●')
    expect(art).toContain('▲ ■ ●')
    expect(art).toContain('v1.2.3')
    expect(art).toContain('CLI for TresJS projects')
  })

  it('keeps every mood the same size, so the aside never shifts', () => {
    const moods: ui.Mood[] = ['neutral', 'happy', 'wink', 'excited', 'sleepy']
    const rows = moods.map(mood => ui.mascot('1.2.3', 'tagline', mood).split('\n').map(stripColors))

    for (const [index] of rows[0].entries()) {
      expect(new Set(rows.map(lines => lines[index].length)).size).toBe(1)
    }
  })

  it('draws the mood it is handed', () => {
    expect(ui.mascot('1.2.3', 'tagline', 'excited')).toContain('>     <')
    expect(ui.mascot('1.2.3', 'tagline', 'happy')).toContain('╰─────╯')
  })

  it('picks neutral half the time and a variant otherwise', () => {
    expect(ui.pickMood(() => 0)).toBe('neutral')
    expect(ui.pickMood(() => 0.49)).toBe('neutral')
    expect(ui.pickMood(() => 0.5)).not.toBe('neutral')
    expect(ui.pickMood(() => 0.99)).toBe('sleepy')
  })
})
