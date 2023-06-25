import { type UserConfig, type Plugin, ViteDevServer } from 'vite'
import sirv from 'sirv'
import { resolve } from 'pathe'
import type { ResolvedTresOptions, TresOptions } from './config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export function TresPlugin(useSirv = false, options: ResolvedTresOptions = {}) {
  return <Plugin>{
    name: 'vite-plugin-tres',
    enforce: 'pre',
    apply: 'serve',
    config() {
      return options.vite
    },
    configureServer(server: ViteDevServer) {
      const projectRoot = server.config.root ?? process.cwd()

      let base = server.config.base
      if (!base.endsWith('/')) {
        base += '/'
      }

      const entryPoint = `${base}${options.entryPoint}`
      const tresCITarget = `${base}__tres__ci__.html`
      const tresCIEntryPoint = `${base}__tres__ci__target__.html`

      const tresHtmlCIFile = resolve(fileURLToPath(import.meta.url), '../../client/tres-ci.html')
      const tresHtmlFile = resolve(fileURLToPath(import.meta.url), '../../client/tres.html')
      const tresTargetHtmlFile = resolve(projectRoot, options.entryPoint ?? 'index.html')

      console.log('tresTargetHtmlFile', tresTargetHtmlFile)

      const tresHtmlCIPromise = readFile(tresHtmlCIFile, 'utf-8')
      const tresHtmlPromise = readFile(tresHtmlFile, 'utf-8')
      const tresTargetHtmlPromise = readFile(tresTargetHtmlFile, 'utf-8')

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? ''

        // intercepting entry point: `${base}` or `${base}${options.entryPoint ?? 'index.html'}`
        if (url === base || url === entryPoint) {
          res.setHeader('Content-Type', 'text/html')
          res.statusCode = 200
          res.end(await tresHtmlCIPromise)
          return
        }

        if (url === `${base}__tres`) {
          res.setHeader('Content-Type', 'text/html')
          res.statusCode = 200
          res.end(await tresHtmlCIPromise)
          return
        }

        // intercepting CI entry point: `${base}__tres__ci__/`
        if (url === tresCITarget) {
          res.setHeader('Content-Type', 'text/html')
          res.statusCode = 200
          res.end(await tresHtmlPromise)
          return
        }

        // intercepting CI target: `${base}__tres_ci_target__.html`
        if (url === tresCIEntryPoint) {
          res.setHeader('Content-Type', 'text/html')
          res.statusCode = 200
          res.end(await tresTargetHtmlPromise)
          return
        }

        next()
      })

      if (useSirv) {
        server.middlewares.use(
          `${base}__tres_ci__`,
          sirv(resolve(tresHtmlCIFile, '..'), {
            single: true,
            dev: true,
          }),
        )
      }
    },
  }
}
