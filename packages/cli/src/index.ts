import type { CommandDefinition } from './registry'
import { createRequire } from 'node:module'
import { Command, InvalidArgumentError } from 'commander'
import { defineCommand, registerCommands } from './registry'
import { enableColorOnStderr, fail, mascot } from './ui'

const require = createRequire(import.meta.url)
const pkg = require('../package.json') as { version: string, description: string }

const TEXTURE_FORMATS = ['webp', 'jpeg', 'png', 'avif'] as const

/** Reject formats sharp cannot encode before they reach textureCompress with a cryptic error. */
function parseFormat(value: string): string {
  if (!(TEXTURE_FORMATS as readonly string[]).includes(value)) {
    throw new InvalidArgumentError(`must be one of ${TEXTURE_FORMATS.join(', ')}`)
  }
  return value
}

const PHYSICS_ENGINES = ['rapier'] as const

/** One engine today. Naming it anyway keeps `--physics` open for the next one. */
function parseEngine(value: string): string {
  if (!(PHYSICS_ENGINES as readonly string[]).includes(value)) {
    throw new InvalidArgumentError(`must be one of ${PHYSICS_ENGINES.join(', ')}`)
  }
  return value
}

/** A NaN silently handed to MeshoptSimplifier is worse than a clear rejection up front. */
function parseFraction(name: string, max: number) {
  return (value: string): number => {
    const n = Number.parseFloat(value)
    if (Number.isNaN(n) || n < 0 || n > max) {
      throw new InvalidArgumentError(`${name} must be a number between 0 and ${max}`)
    }
    return n
  }
}

const commands: CommandDefinition[] = [
  defineCommand({
    name: 'gltf <input>',
    description: 'Generate a Vue component from a .glb/.gltf model.',
    setup: cmd => cmd
      .option('-o, --output <path>', 'where to write the component (default: <Model>.gen.vue next to the model)')
      .option('-u, --url <url>', 'url the model is served from (default: inferred from public/)')
      .option('-s, --slots <mode>', 'named | all | none', 'named')
      .option('--shadows', 'add cast-shadow and receive-shadow to meshes')
      .option('-K, --keepgroups', 'keep pass-through groups')
      .option('-k, --keepnames', 'keep name attributes')
      .option('-r, --root <name>', 'generate from this subtree')
      .option('-p, --precision <digits>', 'fractional digits on transforms', v => Number.parseInt(v, 10), 2)
      .option('-m, --meta', 'emit glTF extras as :user-data')
      .option('-c, --console', 'print the component instead of writing it')
      .option('-f, --force', 'overwrite a file this tool did not generate')
      .option('-v, --verbose', 'list every slot name instead of the first few')
      .option('-T, --transform', 'optimize the model into a separate -transformed.glb and generate against it')
      .option('-i, --instance', 'batch meshes that share a geometry and material into an InstancedMesh (implies --transform)')
      .option('-I, --instanceall', 'batch every eligible mesh, even the ones that appear once (implies --transform)')
      .option('-P, --physics <engine>', 'generate colliders from node name suffixes: rapier', parseEngine)
      .option('--resolution <px>', 'max texture size when transforming', v => Number.parseInt(v, 10), 1024)
      .option('--format <fmt>', 'texture format when transforming: webp | jpeg | png | avif', parseFormat, 'webp')
      .option('--simplify', 'reduce geometry with meshoptimizer when transforming')
      .option('--ratio <n>', 'target fraction of vertices to keep with --simplify', parseFraction('--ratio', 1))
      .option('--error <n>', 'error ceiling with --simplify, as a fraction of mesh radius', parseFraction('--error', 1))
      .option('--keepmeshes', 'do not merge meshes when transforming')
      .option('--keepmaterials', 'do not batch materials when transforming')
      .option('--dry-run', 'report what the parser sees without generating')
      .option('--json', 'print the full parse as JSON'),
    load: async () => (await import('./commands/gltf')).default,
  }),
  defineCommand({
    name: 'banana',
    description: 'Print bananas. Smoke-tests the command registry end to end.',
    setup: cmd => cmd.option('-c, --count <n>', 'how many bananas', v => Number.parseInt(v, 10), 1),
    load: async () => (await import('./commands/banana')).default,
  }),
]

const program = new Command()

program
  .name('tres')
  .description(pkg.description)
  .version(pkg.version)
  // beforeAll on the root is inherited by every subcommand's help, so the mascot has to be
  // gated on command identity. `tres` with no arguments lands here too, which is the point:
  // that is the only screen anyone reads as a landing page.
  .addHelpText('beforeAll', context => (context.command === program ? `\n${mascot(pkg.version, pkg.description)}\n` : ''))

registerCommands(program, commands)

async function main() {
  // Colour on stderr is a decision for the binary, not for whoever imports the ui module.
  enableColorOnStderr()

  try {
    await program.parseAsync(process.argv)
  }
  catch (error) {
    fail(error)
    process.exitCode = 1
  }
}

main()
