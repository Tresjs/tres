import type { CommandDefinition } from './registry'
import { createRequire } from 'node:module'
import { Command } from 'commander'
import { banner } from './banner'
import { defineCommand, registerCommands } from './registry'

const require = createRequire(import.meta.url)
const pkg = require('../package.json') as { version: string }

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
      .option('-T, --transform', 'optimize the model into a separate -transformed.glb and generate against it')
      .option('--resolution <px>', 'max texture size when transforming', v => Number.parseInt(v, 10), 1024)
      .option('--format <fmt>', 'texture format when transforming: webp | jpeg | png | avif', 'webp')
      .option('--simplify', 'reduce geometry with meshoptimizer when transforming')
      .option('--ratio <n>', 'target fraction of vertices to keep with --simplify', v => Number.parseFloat(v))
      .option('--error <n>', 'error ceiling with --simplify, as a fraction of mesh radius', v => Number.parseFloat(v))
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
  .description('CLI for TresJS projects')
  .version(pkg.version)
  .addHelpText('beforeAll', `\n${banner()}\n`)

registerCommands(program, commands)

async function main() {
  try {
    await program.parseAsync(process.argv)
  }
  catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}

main()
