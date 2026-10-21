// Runs after `tsdown` and bundles a minimal app per entry, the way an app bundler sees
// `dist`. Fails when an app that imports `@tresjs/core/webgpu` ships `WebGLRenderer`.
// The app keeps the whole entry namespace, so no export of `/webgpu` may reach WebGL.
import { Buffer } from 'node:buffer'
import { dirname, join } from 'pathe'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { build } from 'vite'
import { report } from '../../../tools/guards/entry-graph.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const APP_ID = 'virtual:tres-app'

const bundleApp = async (specifier) => {
  const output = await build({
    configFile: false,
    logLevel: 'silent',
    root,
    plugins: [{
      name: 'tres-app',
      resolveId: id => (id === APP_ID ? `\0${APP_ID}` : undefined),
      load: id => (id === `\0${APP_ID}`
        ? `import * as Tres from '${specifier}'\nimport { createApp, h } from 'vue'\nglobalThis.tres = Tres\ncreateApp({ render: () => h(Tres.TresCanvas) }).use(Tres.default).mount('#app')\n`
        : undefined),
    }],
    build: {
      write: false,
      minify: false,
      rollupOptions: { input: APP_ID },
    },
  })
  return output.output.filter(file => file.type === 'chunk').map(chunk => chunk.code).join('\n')
}

const kB = bytes => `${(bytes / 1024).toFixed(1)} kB`
const describe = code => `${kB(Buffer.byteLength(code))}, gzip ${kB(gzipSync(code).length)} (unminified)`

// rolldown emits `var X = class` and other bundlers `class X`, so match both.
const defines = (code, name) => new RegExp(`\\bclass ${name}\\b|\\b${name} = class\\b`).test(code)

const errors = []
// Resolved through the `exports` map of package.json, as in an app.
const webglApp = await bundleApp('@tresjs/core')
const webgpuApp = await bundleApp('@tresjs/core/webgpu')

if (!defines(webglApp, 'WebGLRenderer')) {
  errors.push('The root entry app has no WebGLRenderer. The check reads the wrong bundle or the default renderer is gone.')
}
if (!defines(webgpuApp, 'WebGPURenderer')) {
  errors.push('The webgpu entry app has no WebGPURenderer. The check reads the wrong bundle or the default renderer is gone.')
}
if (defines(webgpuApp, 'WebGLRenderer')) {
  errors.push('An app that imports @tresjs/core/webgpu bundles WebGLRenderer. Shared code must not import it from "three".')
}

report('check-bundle', errors, `root app ${describe(webglApp)}; webgpu app ${describe(webgpuApp)} without WebGLRenderer`)
