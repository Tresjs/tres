import { readFile } from 'node:fs/promises'
import { addComponent, addImports, addVitePlugin, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'
import * as core from '@tresjs/core'
import { templateCompilerOptions } from '@tresjs/core'
import { defu } from 'defu'
import { findExportNames } from 'mlly'
import { readPackageJSON } from 'pkg-types'
import glsl from 'vite-plugin-glsl'
import { version } from '../package.json'
import { setupDevToolsUI } from './devtools'
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

    const allDeps = await getAllPackageDeps(nuxt.options.rootDir)
    const coreDeps = Object.keys(allDeps).filter(d => d.startsWith('@tresjs/'))

    for (const mod of new Set([...options.modules, ...coreDeps])) {
      if (mod === '@tresjs/core' || mod === '@tresjs/nuxt') {
        continue
      }

      const entry = await resolvePath(mod)
      if (entry === mod) {
        continue
      }

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

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolver)
    }

    if (options.glsl) {
      addVitePlugin(glsl())
    }
  },
})
