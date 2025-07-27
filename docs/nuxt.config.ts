import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { templateCompilerOptions } from '@tresjs/core'

function findMonorepoRootPackageJson(startDir: string): string | undefined {
  let dir = startDir
  while (true) {
    const pkgPath = resolve(dir, 'package.json')
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
      // Check for a field unique to your monorepo root
      if (pkg.workspaces || pkg.name === '@tresjs/core') {
        return pkgPath
      }
    }
    const parentDir = dirname(dir)
    if (parentDir === dir) {
      break
    }
    dir = parentDir
  }
  return undefined
}

const rootPkgPath = findMonorepoRootPackageJson(__dirname)
const pkg = JSON.parse(readFileSync(rootPkgPath!, 'utf-8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-llms',
  ],

  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],

  vue: {
    compilerOptions: templateCompilerOptions.template.compilerOptions,
  },

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      pkgVersion: pkg.version,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
    },
  },

  icon: {
    provider: 'iconify',
  },

  llms: {
    domain: 'https://docs.tresjs.org/',
    title: 'TresJS Docs',
    description: 'A documentation for building 3D scenes with TresJS.',
    full: {
      title: 'TresJS - Full Documentation',
      description: 'This is the full documentation for the TresJS written in markdown (MDC Syntax)',
    },
    sections: [
      {
        title: 'Getting Started', // docs/content/1.getting-started
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' },
        ],
      },
      {
        title: 'Essentials', // docs/content/2.essentials
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/essentials%' },
        ],
      },
      {
        title: 'API Reference', // docs/content/3.api
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api%' },
        ],
      },
      {
        title: 'Cookbook', // docs/content/4.cookbook
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/cookbook%' },
        ],
      },
    ],
  },
})
