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
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/content', 'nuxt-llms', '@nuxt/scripts'],
  $production: {
    scripts: {
      registry: {
        fathomAnalytics: {
          site: 'NLLAFMJJ',
        },
      },
    },
  },
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
      concurrency: 1, // Reduce concurrent rendering to save memory
      interval: 100, // Add small delay between renders
    },
  },

  icon: {
    customCollections: [{
      prefix: 'tres',
      dir: './app/assets/icons',
    }],
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
