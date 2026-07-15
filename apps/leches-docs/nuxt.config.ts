import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { templateCompilerOptions } from '@tresjs/core'
import { defineNuxtConfig } from 'nuxt/config'

let pkgPath = resolve(__dirname, 'node_modules/@tresjs/leches/package.json')
try {
  readFileSync(pkgPath, 'utf-8')
}
catch {
  pkgPath = resolve(__dirname, '../../packages/leches/package.json')
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

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

  // @ts-expect-error Nuxt 4.1's generated config type omits the valid Nitro option.
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
    domain: 'https://tresleches.tresjs.org/',
    title: 'Tres Leches',
    description: 'Tasty, reactive GUI controls for Vue.',
    full: {
      title: 'Tres Leches — Full Documentation',
      description: 'Complete documentation for installing, configuring, and using Tres Leches controls.',
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
        title: 'Guide',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/guide%' },
        ],
      },
      {
        title: 'API Reference',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api%' },
        ],
      },
    ],
  },
})
