import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'
import type { Plugin, ViteDevServer } from 'vite'

export interface TresDevtoolOptions {
  // Options
}

const DEVTOOLS_UI_ROUTE = '/__tres_devtools'
const DEVTOOLS_UI_LOCAL_PORT = 3333
  
export default function TresDevtools(ctx: TresDevtoolOptions): Plugin {
  async function configureServer(server: ViteDevServer) {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const clientPath = resolve('./client')

    const devtoolsPath = resolve(__dirname, '../client/')

    const isProductionBuild = existsSync(clientPath)

    console.log(`[tres-devtools] isProductionBuild: ${isProductionBuild}`)

    if (isProductionBuild) {
      server.middlewares.use(DEVTOOLS_UI_ROUTE, sirv(devtoolsPath, {
        single: true,
        dev: true,
      }))
    } else {
      server.config.server.proxy = {
        [DEVTOOLS_UI_ROUTE]: {
          target: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}`,
          changeOrigin: true,
          followRedirects: true,
          rewrite: path => path.replace(DEVTOOLS_UI_ROUTE, ''),
        },
      }
      console.log(`[tres-devtools] Proxying ${DEVTOOLS_UI_ROUTE} to http://localhost:${DEVTOOLS_UI_LOCAL_PORT}`)
    }

  }

  return {
    name: 'tres-devtools',
    configureServer,
  } as Plugin
}