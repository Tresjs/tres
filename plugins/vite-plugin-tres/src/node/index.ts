import { UserConfig, type Connect, type Plugin, type ResolvedConfig, type ViteDevServer } from 'vite'
import sirv from 'sirv'
import { createServer } from 'node:http'
import type { AddressInfo } from 'node:net'
import { isAbsolute, join, resolve } from 'node:path'
import fs from 'fs-extra'
import { Options } from './config'
import { lightGreen, yellow, gray, bold } from 'kolorist'

import { DIR_CLIENT } from '../dir'

export const plugin = (useSirv = false, options: Options = {}) => {
  const outputDir = options.outputDir ?? '.tres-inspect'
  /* let config: ResolvedConfig */

  async function generateBuild() {
    const targetDir = /* isAbsolute(outputDir)
      ? outputDir
      : resolve(config.root, outputDir) */
      outputDir

    await fs.emptyDir(targetDir)
    await fs.copy(DIR_CLIENT, targetDir)

    await fs.writeFile(
      join(targetDir, 'index.html'),
      (await fs.readFile(join(targetDir, 'index.html'), 'utf-8'))
        .replace(
          'data-tres-inspect-mode="DEV"',
          'data-tres-inspect-mode="BUILD"',
        ),
    )

    return targetDir
  }

  function configureServer(server: ViteDevServer) {
    const base = (options.base ?? server.config.base) || '/'

    server.middlewares.use((req, res, next) => {
      console.log(req.url)
      next()
    })

    if (useSirv) {
      server.middlewares.use(`${base}__tres`, sirv('.', {
        single: true,
        dev: true,
      }))
    }
  }

  function createPreviewServer(staticPath: string) {
    const server = createServer()

    const statics = sirv(staticPath)
    server.on('request', (req, res) => {
      statics(req, res, () => {
        res.statusCode = 404
        res.end('File not found')
      })
    })

    server.listen(0, () => {
      const { port } = server.address() as AddressInfo
      const url = `http://localhost:${port}`
      // eslint-disable-next-line no-console
      console.log(`  ${lightGreen('➜')}  ${bold('Tres Inspect Preview Started')}: ${url}`)
      openBrowser(url)
    })

    async function openBrowser(address: string) {
      await import('open')
        .then(r => r.default(address, { newInstance: true }))
        .catch(() => { })
    }
  }

  return {
    name: 'vite-plugin-tres',
    enforce: 'pre',
    apply: 'serve',
    config(config) {
      const thisConfig: UserConfig = {}
      if (typeof config.server?.open === 'undefined') {
        thisConfig.server = {
          open: true,
        }
      }
      console.log(thisConfig)
      return thisConfig
    },
    configureServer,
    /*     configureServer, */
    /*  async buildStart() {
       const dir = await generateBuild()
       console.log(`  ${lightGreen('➜')}  ${bold('Tres Inspect Build Completed')}: ${dir}`)
       createPreviewServer(dir)
     } */
  }

}

export default plugin