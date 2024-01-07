import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import sirv from 'sirv'
import type { Plugin, ViteDevServer } from 'vite'

export interface TresDevtoolOptions {
  // Options
}

const DEVTOOLS_UI_ROUTE = '/__tres_devtools'
const DEVTOOLS_UI_LOCAL_PORT = 3333
  
export default function TresDevtools(ctx: TresDevtoolOptions): Plugin {
  async function configureServer(server: ViteDevServer) {
    const clientPath = resolve('./client')

    const isProductionBuild = existsSync(clientPath)

    if (isProductionBuild) {
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE, 
        sirv(clientPath, {
          single: true,
          dev: true,
        }),
      )
    }
    else {
      server.config.server.proxy = {
        [DEVTOOLS_UI_ROUTE]: {
          target: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}`,
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