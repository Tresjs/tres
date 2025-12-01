import svgLoader from 'vite-svg-loader'

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
    '@nuxtjs/seo',
  ],
  site: {
    name: 'TresJS Lab',
    url: 'https://lab.tresjs.org',
    description: 'Explore creative WebGL experiments built with TresJS, the declarative ThreeJS framework for Vue',
    image: '/og-home.png',
    icon: '/favicon.ico',
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
        /[\/]packages[\\/]cientos[\\/]dist[\\/]trescientos\.js$/,
        /[\/]packages[\\/]core[\\/]dist[\\/]tres\.js$/,
        /[\/]packages[\\/]leches[\\/]dist[\\/]tresleches\.js$/,
        /[\/]packages[\\/]postprocessing[\\/]dist[\\/]tres-post-processing\.js$/,
      ],
    }
  },

  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' },
      { name: 'Inter', provider: 'google' },
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
    }
  },

  vite: {
    plugins: [svgLoader()],
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
    }
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