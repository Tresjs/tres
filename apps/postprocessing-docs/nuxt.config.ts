import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { templateCompilerOptions } from '@tresjs/core'

// Try to read from node_modules first (works in production), fallback to monorepo path
let ppPackageJsonPath = resolve(__dirname, 'node_modules/@tresjs/post-processing/package.json')
try {
  readFileSync(ppPackageJsonPath, 'utf-8')
}
catch {
  ppPackageJsonPath = resolve(__dirname, '../../packages/postprocessing/package.json')
}

const pkg = JSON.parse(readFileSync(ppPackageJsonPath, 'utf-8'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/content', 'nuxt-llms'],

  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
  },

  router: {
    options: {
      strict: true,
    },
  },

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
    domain: 'https://post-processing.tresjs.org/',
    title: 'TresJS Post-processing',
    description: 'Post-processing effects library for TresJS built on pmndrs/postprocessing.',
    full: {
      title: 'TresJS Post-processing - Full Documentation',
      description: 'Complete post-processing documentation including getting started guides and API reference for all effects.',
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' },
        ],
      },
      {
        title: 'pmndrs Effects',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/pmndrs%' },
        ],
      },
      {
        title: 'Three.js Effects',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/three%' },
        ],
      },
    ],
  },
})
