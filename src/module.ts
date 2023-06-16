import { defineNuxtModule, addImports, addComponent, createResolver, resolvePath } from '@nuxt/kit'
import * as core from '@tresjs/core'
import { readPackageJSON } from 'pkg-types'
import { findExportNames } from 'mlly'
import { readFile } from 'fs/promises'

export interface ModuleOptions {
  modules: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@tresjs/nuxt',
    configKey: 'tres'
  },
  defaults: {
    modules: []
  },
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addComponent({
      filePath: resolver.resolve('./runtime/components/TresCanvas.vue'),
      name: 'TresCanvas'
    })
    nuxt.options.build.transpile.push(/@tresjs/)

    for (const name in core) {
      if (name.match(/^use/)) {
        addImports({
          from: '@tresjs/core',
          name: name
        })
      }
    }
    addImports([
      {
        from: '@tresjs/core',
        name: 'extend',
        as: 'extendTres'
      },
      {
        from :'@tresjs/core',
        type: true,
        name: 'TresObject'
      }
    ])

    nuxt.hook('prepare:types', ({ references }) => {
      references.push({ types: '@tresjs/core' })
    })
    const isCustomElement = nuxt.options.vue.compilerOptions.isCustomElement
    nuxt.options.vue.compilerOptions.isCustomElement = (tag) => {
      return ((tag.startsWith('Tres') && tag !== 'TresCanvas') || tag === 'primitive') || isCustomElement?.(tag)
    }

    const pkg = await readPackageJSON(nuxt.options.rootDir)
    const coreDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(d => d.startsWith('@tresjs/'))
    for (const mod of new Set([...options.modules, ...coreDeps])) {
      if (mod === '@tresjs/core' || mod === '@tresjs/nuxt') continue

      const entry = await resolvePath(mod);
      if (entry === mod) continue

      const imports = findExportNames(await readFile(entry, 'utf8'))
      for (const name of imports) {
        if (name.match(/^[a-z]/)) {
          addImports({
            from: mod,
            name: name
          })
        } else {
          addComponent({
            name: name,
            filePath: mod,
            export: name,
          })
        }
      }
    }
  }
})
