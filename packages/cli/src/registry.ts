import type { Command } from 'commander'

export interface CommandHandler {
  (this: Command, ...args: any[]): void | Promise<void>
}

export interface CommandDefinition {
  name: string
  description: string
  /** Declare .option()/.argument() at registration time. Must stay implementation-free — it runs on every startup. */
  setup?: (command: Command) => void
  /** Imported only when the command actually runs. */
  load: () => Promise<CommandHandler>
}

export function defineCommand(definition: CommandDefinition): CommandDefinition {
  return definition
}

export function registerCommands(program: Command, definitions: CommandDefinition[]): void {
  for (const definition of definitions) {
    const command = program
      .command(definition.name)
      .description(definition.description)

    definition.setup?.(command)

    command.action(async function (this: Command, ...args: any[]) {
      const handler = await definition.load()
      await handler.apply(this, args)
    })
  }
}
