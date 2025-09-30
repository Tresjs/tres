import { existsSync } from 'node:fs'
import type { Resolver } from '@nuxt/kit'
import type { Nuxt } from 'nuxt/schema'
import { addCustomTab } from '@nuxt/devtools-kit'

const DEVTOOLS_UI_ROUTE = '/__tres_nuxt_devtools'
const DEVTOOLS_UI_LOCAL_PORT = 3300

export function setupDevToolsUI(nuxt: Nuxt, resolver: Resolver) {
  const clientPath = resolver.resolve('./client')
  const isProductionBuild = existsSync(clientPath)

  // Serve production-built client (used when package is published)
  if (isProductionBuild) {
    nuxt.hook('vite:serverCreated', async (server) => {
      const sirv = await import('sirv').then(r => r.default || r)
      server.middlewares.use(
        DEVTOOLS_UI_ROUTE,
        sirv(clientPath, { dev: true, single: true }),
      )
    })
  }
  // In local development, use Nitro to proxy to the separate Nuxt Server
  else {
    nuxt.hook('vite:extendConfig', (config) => {
      config.server = config.server || {}
      config.server.proxy = config.server.proxy || {}
      config.server.proxy[DEVTOOLS_UI_ROUTE] = {
        target: 'http://localhost:' + DEVTOOLS_UI_LOCAL_PORT + DEVTOOLS_UI_ROUTE,
        changeOrigin: true,
        followRedirects: true,
        rewrite: path => path.replace(DEVTOOLS_UI_ROUTE, ''),
      }
    })
    // Use Nitro hooks instead of vite:extendConfig for better compatibility with Nuxt 4
    /* nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.routeRules = nitroConfig.routeRules || {}
      // Add a route rule to proxy the devtools route to the local development server
      nitroConfig.routeRules[`${DEVTOOLS_UI_ROUTE}/**`] = {
        proxy: `http://localhost:${DEVTOOLS_UI_LOCAL_PORT}${DEVTOOLS_UI_ROUTE}/**`,
      }
    }) */
  }

  addCustomTab(() => ({
    name: 'tres-nuxt-devtools',
    title: 'TresJS',
    icon: 'https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg',
    view: {
      type: 'iframe',
      src: DEVTOOLS_UI_ROUTE,
    },
  }))
}
