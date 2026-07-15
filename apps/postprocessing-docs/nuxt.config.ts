import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { templateCompilerOptions } from '@tresjs/core'

let pkgPath = resolve(__dirname, 'node_modules/@tresjs/post-processing/package.json')
try {
  readFileSync(pkgPath, 'utf-8')
}
catch {
  pkgPath = resolve(__dirname, '../../packages/postprocessing/package.json')
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

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
      routes: ['/'],
      crawlLinks: true,
    },
  },

  icon: {
    provider: 'iconify',
  },

  llms: {
    domain: 'https://post-processing.tresjs.org/',
    title: 'TresJS Post-processing',
    description: 'Effect composer and post-processing effects library for TresJS.',
    full: {
      title: 'TresJS Post-processing — Full Documentation',
      description: 'Complete post-processing documentation including getting started guides, pmndrs effects, three native effects, and advanced usage.',
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
        title: 'API Reference',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api%' },
        ],
      },
      {
        title: 'Advanced',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/advanced%' },
        ],
      },
    ],
  },
})
