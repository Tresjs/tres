import cac from 'cac'
import { consola } from 'consola'
import { green } from 'colorette'
import { createServer } from 'vite'
import { VERSION } from './constants'
import type { TresOptions, ResolvedTresOptions } from './config'
import { loadConfig } from './config'
import { TresPlugin } from './plugin'
import { resolve } from 'pathe'
import { fileURLToPath } from 'node:url'

export async function startCli(args: string[] = process.argv) {
  const cli = cac('tres-ci')

  cli
    .version(VERSION)
    .option('-r, --root <path>', 'Root path')
    .option('-c, --config <path>', 'Path to config file')
    .help()
    .command('[...files]', 'Run Tres CI')
    .action((files, options) => run(files, options))

  cli.parse(args)
}

async function run(_files: string[] = [], userConfig: TresOptions = {}) {
  consola.log(green(`Tres CI v${VERSION}`))
  consola.start('Starting Vite server...')

  const root = userConfig?.root ?? process.cwd()

  const { config } = await loadConfig<TresOptions>(root, userConfig)

  config.root = root

  config.plugins = config.plugins ?? []

  const { entryPoint, ...vite } = config

  const resolvedConfig: ResolvedTresOptions = {
    vite,
    entryPoint: 'tres-ci.html',
  }

  config.plugins.unshift(TresPlugin(true, resolvedConfig))

  vite.config = vite.config ?? {
    server: {
      port: 5174,
    },
  }

  /*   vite.config = vite.config ?? {
      build: {
        rollupOptions: {
          input: {
            main: resolve((import.meta.url), '../tres-ci.html')
          }
        }
      },
    } */

  const server = await createServer(vite)

  await server.pluginContainer.buildStart({})

  await server.listen()

  consola.ready('Tres CLI is ready: ', config.server?.port ?? 5174)
}
