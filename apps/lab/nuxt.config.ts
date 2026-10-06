import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import svgLoader from 'vite-svg-loader'

// glyph is excluded from Vite pre-bundling (see optimizeDeps.exclude), so in dev its dist files are served under
// their real names. Two of those bite:
// - `internal/fingerprint.js` is a hash helper, but privacy blockers (EasyPrivacy) block any URL containing
//   "fingerprint" and the whole experiment fails to import. Serve it under a virtual id instead.
// - the package ships `sourceMappingURL` comments without the .map files, which floods the terminal with warnings.
// Production bundles into hashed chunks, so neither applies there.
const GLYPH_HASH_ID = '\0glyph-hash-helper.js'
function glyphDevServing(): Plugin {
  let realPath: string | undefined
  return {
    name: 'lab:glyph-dev-serving',
    enforce: 'pre',
    apply: 'serve',
    async resolveId(source, importer) {
      if (!importer?.includes('/@pmndrs/glyph/') || !source.endsWith('/fingerprint.js')) { return }
      const resolved = await this.resolve(source, importer, { skipSelf: true })
      if (!resolved) { return }
      // Vite tags excluded deps with a `?v=<hash>` query; the file system does not know about it.
      realPath = resolved.id.split('?')[0]
      return GLYPH_HASH_ID
    },
    load(id) {
      const path = id.split('?')[0]!
      const file = id === GLYPH_HASH_ID ? realPath : path.includes('/@pmndrs/glyph/dist/') && path.endsWith('.js') ? path : undefined
      if (!file) { return }
      return readFileSync(file, 'utf8').replace(/\n\/\/# sourceMappingURL=.*$/m, '')
    },
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui',
    'nuxt-svgo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/devtools',
    '@tresjs/nuxt',
    '@nuxt/scripts',
  ],

  runtimeConfig: {
    public: {
      // Origin used to build absolute og:image/twitter:image URLs. Social crawlers reject
      // relative paths. DEPLOY_PRIME_URL makes deploy previews point at their own origin, so
      // the image resolves there too; falls back to the production domain on local builds.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
        || process.env.DEPLOY_PRIME_URL
        || process.env.URL
        || 'https://lab.tresjs.org',
    },
  },

  css: ['~/assets/styles/main.css'],
  declare: ['*.glsl'],
  tres: {
    devtools: true,
    glsl: true,
  },

  imports: {
    transform: {
      exclude: [
        /\/packages[/\\]cientos[/\\]dist[/\\]trescientos\.js$/,
        /\/packages[/\\]core[/\\]dist[/\\]tres\.js$/,
        /\/packages[/\\]leches[/\\]dist[/\\]tresleches\.js$/,
        /\/packages[/\\]postprocessing[/\\]dist[/\\]tres-post-processing\.js$/,
      ],
    },
  },

  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      // Weights listed explicitly: the label uses 600, which is not a Google default.
      { name: 'Crimson Pro', provider: 'google', weights: [400, 600, 700] },
    ],
  },

  routeRules: {
    '/': { prerender: true },
  },

  image: {
    format: ['webp', 'avif'],
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
      preload: ['bash', 'css', 'javascript', 'json', 'markdown', 'scss', 'vue', 'glsl'],
    },
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'carbon', 'game-icons', 'ic', 'logos', 'ph'],
      externalizeIconsJson: true,
    },
  },

  vite: {
    plugins: [svgLoader(), glyphDevServing()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
        'three-stdlib',
        'camera-controls',
        'three-custom-shader-material/vanilla',
        'three/webgpu',
        'stats.js',
        'stats-gl',
        'radashi',
        '@pmndrs/pointer-events',
      ],
      // glyph locates its wasm with `new URL('...wasm', import.meta.url)`; pre-bundling would point that
      // at Vite's dep cache where the file does not exist.
      exclude: [
        '@pmndrs/glyph',
        '@pmndrs/glyph/vue',
        '@pmndrs/glyph/vue/slug',
        '@pmndrs/glyph/three',
      ],
    },
  },

  compatibilityDate: '2024-08-29',
  $production: {
    scripts: {
      registry: {
        fathomAnalytics: {
          site: 'RCNYLVAZ',
        },
      },
    },
  },
})
