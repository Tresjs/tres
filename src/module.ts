import { defineNuxtModule, addImports, addComponent, addTemplate, createResolver } from '@nuxt/kit'
import * as core from '@tresjs/core'
import { readPackageJSON } from 'pkg-types'

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
    nuxt.options.build.transpile.push(/@tresjs/, 'postprocessing')

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
      return (tag.startsWith('Tres') && tag !== 'TresCanvas') || isCustomElement?.(tag)
    }

    const pkg = await readPackageJSON(nuxt.options.rootDir)
    const coreDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(d => d.startsWith('@tresjs/'))
    for (const mod of new Set([...options.modules, ...coreDeps])) {
      const imports = await import(mod)
      for (const name in imports) {
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
