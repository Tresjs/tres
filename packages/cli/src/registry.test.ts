import type { CommandDefinition, CommandHandler } from './registry'
import { Command } from 'commander'
import { describe, expect, it, vi } from 'vitest'
import { defineCommand, registerCommands } from './registry'

function createProgram(): Command {
  const program = new Command()
  program.name('tres').exitOverride()
  program.configureOutput({
    writeErr: () => {},
    writeOut: () => {},
  })
  return program
}

function createLoad(handler: CommandHandler = vi.fn()) {
  return vi.fn(async (): Promise<CommandHandler> => handler)
}

describe('defineCommand', () => {
  it('returns the definition unchanged', () => {
    const load = createLoad()
    const definition = defineCommand({ name: 'foo', description: 'Foo command', load })

    expect(definition).toEqual({ name: 'foo', description: 'Foo command', load })
  })
})

describe('registerCommands', () => {
  it('lists registered commands in --help output', () => {
    const program = createProgram()
    const definitions: CommandDefinition[] = [
      defineCommand({ name: 'gltf', description: 'Transform glTF assets', load: createLoad() }),
    ]

    registerCommands(program, definitions)

    const help = program.helpInformation()
    expect(help).toContain('gltf')
    expect(help).toContain('Transform glTF assets')
  })

  it('defers load() until the command is invoked', async () => {
    const handler: CommandHandler = vi.fn()
    const load = createLoad(handler)
    const program = createProgram()

    registerCommands(program, [
      defineCommand({ name: 'doctor', description: 'Check project health', load }),
    ])

    expect(load).not.toHaveBeenCalled()

    await program.parseAsync(['doctor'], { from: 'user' })

    expect(load).toHaveBeenCalledTimes(1)
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('runs setup at registration, while load still does not', () => {
    const setup = vi.fn()
    const load = createLoad()
    const program = createProgram()

    registerCommands(program, [
      defineCommand({ name: 'doctor', description: 'Check project health', setup, load }),
    ])

    expect(setup).toHaveBeenCalledTimes(1)
    expect(load).not.toHaveBeenCalled()
  })

  it('declares an option via setup and forwards its value to the handler', async () => {
    const handler: CommandHandler = vi.fn()
    const load = createLoad(handler)
    const program = createProgram()

    registerCommands(program, [
      defineCommand({
        name: 'gltf',
        description: 'Transform glTF assets',
        setup: command => command.option('--out <path>', 'Output path'),
        load,
      }),
    ])

    await program.parseAsync(['gltf', '--out', 'dist/model.glb'], { from: 'user' })

    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler as ReturnType<typeof vi.fn>).mock.calls[0][0]).toMatchObject({ out: 'dist/model.glb' })
  })

  it('forwards a positional argument value to the handler', async () => {
    const handler: CommandHandler = vi.fn()
    const load = createLoad(handler)
    const program = createProgram()

    registerCommands(program, [
      defineCommand({ name: 'demo <input>', description: 'Demo command', load }),
    ])

    await program.parseAsync(['demo', 'model.glb'], { from: 'user' })

    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler as ReturnType<typeof vi.fn>).mock.calls[0][0]).toBe('model.glb')
  })

  it('exits non-zero with a message naming an unknown command', () => {
    const program = createProgram()

    registerCommands(program, [
      defineCommand({ name: 'doctor', description: 'Check project health', load: createLoad() }),
    ])

    let error: unknown
    try {
      program.parse(['banana'], { from: 'user' })
    }
    catch (caught) {
      error = caught
    }

    expect(error).toMatchObject({
      code: 'commander.unknownCommand',
      exitCode: 1,
    })
    expect((error as Error).message).toContain('banana')
  })
})
