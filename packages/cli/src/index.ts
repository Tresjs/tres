import type { CommandDefinition } from './registry'
import { createRequire } from 'node:module'
import { Command } from 'commander'
import { banner } from './banner'
import { defineCommand, registerCommands } from './registry'

const require = createRequire(import.meta.url)
const pkg = require('../package.json') as { version: string }

const commands: CommandDefinition[] = [
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
