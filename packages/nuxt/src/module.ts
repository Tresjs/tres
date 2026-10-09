import { addComponent, addImports, addTemplate, addVitePlugin, createResolver, defineNuxtModule, resolvePath, useLogger } from '@nuxt/kit'
import { templateCompilerOptions } from '@tresjs/core'
import { defu } from 'defu'
import { readPackageJSON } from 'pkg-types'
import glsl from 'vite-plugin-glsl'
import { version } from '../package.json'
import { setupDevToolsUI } from './devtools'
import type { TresRenderer, WebGPUStub } from './entries'
import { coreEntry, findUnportedComponents, isComponentExport, readExportNames, renderWebGPUStubs, selectEntry } from './entries'
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'

async function getAllPackageDeps(nuxtRootDir: string) {
  // Read local package.json
  const localPkg = await readPackageJSON(nuxtRootDir)
  let rootPkg = localPkg

  // Try to find a parent package.json (monorepo root)
  const parentDir = dirname(nuxtRootDir)
  const rootPkgPath = join(parentDir, 'package.json')
  if (existsSync(rootPkgPath)) {
    rootPkg = await readPackageJSON(parentDir)
  }

  // Merge dependencies, local takes precedence
  return {
    ...rootPkg.dependencies,
    ...rootPkg.devDependencies,
    ...localPkg.dependencies,
    ...localPkg.devDependencies,
  }
}

export interface ModuleOptions {
  modules: string[]
  devtools: boolean
  glsl: boolean
  /**
   * The renderer that auto-imports target. `'webgpu'` imports from the `/webgpu` entries
   * (`@tresjs/core/webgpu`, `@tresjs/cientos/webgpu`). It applies to the whole app.
   * @default 'webgl'
   */
  renderer: TresRenderer
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@tresjs/nuxt',
    configKey: 'tres',
    compatibility: {
      nuxt: '>=3.16.0',
    },
    version,
  },
  defaults: {
    modules: [],
    devtools: true,
    glsl: false,
    renderer: 'webgl',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('@tresjs/nuxt')
    const isWebGPU = options.renderer === 'webgpu'
    const coreEntryId = coreEntry(options.renderer)

    nuxt.options.build.transpile.push(/@tresjs/)

    // `@tresjs/core` is a dependency of this module, so resolve it from here, not from the app.
    const coreNames = await readExportNames(await resolver.resolvePath(coreEntryId))
    for (const name of coreNames) {
      if (name.match(/^use/)) {
        addImports({
          from: coreEntryId,
          name,
        })
      }
    }
    addImports([
      {
        from: coreEntryId,
        name: 'extend',
        as: 'extendTres',
      },
      {
        from: coreEntryId,
        type: true,
        name: 'TresObject',
      },
    ])

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: coreEntryId })
    })

    nuxt.options.vue.compilerOptions.isCustomElement = templateCompilerOptions.template.compilerOptions.isCustomElement

    const allDeps = await getAllPackageDeps(nuxt.options.rootDir)
    const coreDeps = Object.keys(allDeps).filter(d => d.startsWith('@tresjs/'))
    const webgpuStubs: WebGPUStub[] = []

    for (const mod of new Set([...options.modules, ...coreDeps])) {
      if (mod === '@tresjs/core' || mod === '@tresjs/nuxt') {
        continue
      }

      const rootEntry = await resolvePath(mod)
      if (rootEntry === mod) {
        continue
      }

      const entryId = selectEntry(mod, options.renderer, await readPackageJSON(rootEntry))
      if (!entryId) {
        logger.warn(`\`${mod}\` has no WebGPU entry yet, so it is not auto-imported with \`renderer: 'webgpu'\`.`)
        continue
      }

      const entryPath = entryId === mod ? rootEntry : await resolvePath(entryId)
      const imports = await readExportNames(entryPath)

      for (const name of imports) {
        if (isComponentExport(name)) {
          addComponent({
            name,
            filePath: entryId,
            export: name,
          })
        }
        else {
          addImports({
            from: entryId,
            name,
          })
        }
      }

      if (entryId !== mod) {
        const unported = findUnportedComponents(await readExportNames(rootEntry), imports)
        webgpuStubs.push(...unported.map(name => ({ name, from: mod })))
      }
    }

    if (webgpuStubs.length) {
      const stubsTemplate = addTemplate({
        filename: 'tres/webgpu-stubs.mjs',
        getContents: () => renderWebGPUStubs(resolver.resolve('./runtime/webgpuStub'), webgpuStubs),
        write: true,
      })
      for (const { name } of webgpuStubs) {
        addComponent({
          name,
          filePath: stubsTemplate.dst,
          export: name,
        })
      }
    }

    nuxt.options.vite.resolve = defu(nuxt.options.vite.resolve, {
      dedupe: ['three'],
    })

    // Late discovery of `three/webgpu` makes Vite re-optimize and reload, which can load two copies of three.
    nuxt.options.vite.optimizeDeps = defu(nuxt.options.vite.optimizeDeps, {
      include: isWebGPU ? ['three', 'three/webgpu', 'three/tsl'] : ['three'],
    })

    await Promise.all([
      addComponent({
        name: 'TresCanvas',
        filePath: resolver.resolve(isWebGPU ? './runtime/TresCanvasWebGPU.client.vue' : './runtime/TresCanvas.client.vue'),
      }),
      addComponent({
        name: 'TresCanvas',
        filePath: resolver.resolve('./runtime/TresCanvas.server.vue'),
      }),
    ])

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolver)
    }

    if (options.glsl) {
      addVitePlugin(glsl())
    }
  },
})
