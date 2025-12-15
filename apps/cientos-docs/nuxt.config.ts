import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { templateCompilerOptions } from '@tresjs/core'

// Try to read from node_modules first (works in production), fallback to monorepo path
let corePackageJsonPath = resolve(__dirname, 'node_modules/@tresjs/core/package.json')
try {
  readFileSync(corePackageJsonPath, 'utf-8')
}
catch {
  // In development, use the monorepo path
  corePackageJsonPath = resolve(__dirname, '../../packages/core/package.json')
}

const pkg = JSON.parse(readFileSync(corePackageJsonPath, 'utf-8'))

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
    domain: 'https://example.com/',
    title: 'Docs',
    description: 'A documentation site built with Nuxt v4 and Nuxt UI v4.',
    full: {
      title: 'Full Documentation',
      description: 'This is the full documentation written in markdown (MDC Syntax)',
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
