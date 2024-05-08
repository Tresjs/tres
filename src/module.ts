import { readFile } from 'node:fs/promises'
import { addComponent, addImports, addVitePlugin, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'
import * as core from '@tresjs/core'
import { templateCompilerOptions } from '@tresjs/core'
import { readPackageJSON } from 'pkg-types'
import { findExportNames } from 'mlly'
import { defu } from 'defu'
import glsl from 'vite-plugin-glsl'
import { setupDevToolsUI } from './devtools'

export interface ModuleOptions {
  modules: string[]
  devtools: boolean
  glsl: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@tresjs/nuxt',
    configKey: 'tres',
  },
  defaults: {
    modules: [],
    devtools: true,
    glsl: false,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.build.transpile.push(/@tresjs/)

    for (const name in core) {
      if (name.match(/^use/)) {
        addImports({
          from: '@tresjs/core',
          name,
        })
      }
    }
    addImports([
      {
        from: '@tresjs/core',
        name: 'extend',
        as: 'extendTres',
      },
      {
        from: '@tresjs/core',
        type: true,
        name: 'TresObject',
      },
    ])

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@tresjs/core' })
    })

    nuxt.options.vue.compilerOptions.isCustomElement = templateCompilerOptions.template.compilerOptions.isCustomElement

    const pkg = await readPackageJSON(nuxt.options.rootDir)
    const coreDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(d => d.startsWith('@tresjs/'))

    for (const mod of new Set([...options.modules, ...coreDeps])) {
      if (mod === '@tresjs/core' || mod === '@tresjs/nuxt') { continue }

      const entry = await resolvePath(mod)
      if (entry === mod) { continue }

      const imports = findExportNames(await readFile(entry, 'utf8'))

      for (const name of imports) {
        if (name.match(/^[a-z]/)) {
          addImports({
            from: mod,
            name,
          })
        }
        else {
          addComponent({
            name,
            filePath: mod,
            export: name,
          })
        }
      }
    }

    nuxt.options.vite.resolve = defu(nuxt.options.vite.resolve, {
      dedupe: ['three'],
    })

    nuxt.options.vite.optimizeDeps = defu(nuxt.options.vite.optimizeDeps, {
      include: ['three'],
    })

    await Promise.all([
      addComponent({
        name: 'TresCanvas',
        filePath: resolver.resolve('./runtime/TresCanvas.client.vue'),
      }),
      addComponent({
        name: 'TresCanvas',
        filePath: resolver.resolve('./runtime/TresCanvas.server.vue'),
      }),
    ])

    if (options.devtools) { setupDevToolsUI(nuxt, resolver) }

    if (options.glsl) { addVitePlugin(glsl()) }
  },
})
