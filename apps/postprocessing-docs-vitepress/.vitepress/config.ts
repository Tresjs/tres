import { templateCompilerOptions } from '@tresjs/core'
import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Post-processing',
  description: 'Post-processing effects for TresJS',
  head: [
    ['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#82DBC5' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tresjs_dev' }],
    ['meta', { name: 'twitter:creator', content: '@tresjs_dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Cientos - TresJS' }],
    [
      'meta',
      {
        property: 'og:image',
        content: '/og-banner.png',
      },
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: '/og-banner.png',
      },
    ],
    ['script', { 'defer': 'true', 'data-site': 'OWBUVCJK', 'src': 'https://cdn.usefathom.com/script.js' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/' }],
      },
      {
        text: 'Pmndrs',
        items: [
          { text: 'Barrel blur', link: '/guide/pmndrs/barrel-blur' },
          { text: 'Fish Eye', link: '/guide/pmndrs/fish-eye' },
          { text: 'Bloom', link: '/guide/pmndrs/bloom' },
          { text: 'Chromatic Aberration', link: '/guide/pmndrs/chromatic-aberration' },
          { text: 'Color Depth', link: '/guide/pmndrs/color-depth' },
          { text: 'Linocut', link: '/guide/pmndrs/linocut' },
          { text: 'Sepia', link: '/guide/pmndrs/sepia' },
          { text: 'God Rays', link: '/guide/pmndrs/god-rays' },
          { text: 'Brightness Contrast', link: '/guide/pmndrs/brightness-contrast' },
          { text: 'Vignette', link: '/guide/pmndrs/vignette' },
          { text: 'Hue & Saturation', link: '/guide/pmndrs/hue-saturation' },
          { text: 'Lens Distortion', link: '/guide/pmndrs/lens-distortion' },
          { text: 'Grid', link: '/guide/pmndrs/grid' },
          { text: 'Texture', link: '/guide/pmndrs/texture' },
          { text: 'ASCII', link: '/guide/pmndrs/ascii' },
          { text: 'FXAA', link: '/guide/pmndrs/fxaa' },
          { text: 'SMAA', link: '/guide/pmndrs/smaa' },
          { text: 'Kuwahara', link: '/guide/pmndrs/kuwahara' },
          { text: 'Color Average', link: '/guide/pmndrs/color-average' },
          { text: 'Depth of Field', link: '/guide/pmndrs/depth-of-field' },
          { text: 'Dot Screen', link: '/guide/pmndrs/dot-screen' },
          { text: 'Glitch', link: '/guide/pmndrs/glitch' },
          { text: 'Noise', link: '/guide/pmndrs/noise' },
          { text: 'Outline', link: '/guide/pmndrs/outline' },
          { text: 'Pixelation', link: '/guide/pmndrs/pixelation' },
          { text: 'Scanline', link: '/guide/pmndrs/scanline' },
          { text: 'Shock Wave', link: '/guide/pmndrs/shock-wave' },
          { text: 'Tilt Shift', link: '/guide/pmndrs/tilt-shift' },
          { text: 'Tone Mapping', link: '/guide/pmndrs/tone-mapping' },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        text: 'Three',
        items: [
          { text: 'Film', link: '/guide/three/film' },
          { text: 'Glitch', link: '/guide/three/glitch' },
          { text: 'Halftone', link: '/guide/three/halftone' },
          { text: 'Output', link: '/guide/three/output' },
          { text: 'Pixelation', link: '/guide/three/pixelation' },
          { text: 'SMAA', link: '/guide/three/smaa' },
          { text: 'Unreal Bloom', link: '/guide/three/unreal-bloom' },
        ].sort((a, b) => a.text.localeCompare(b.text)),
      },
      {
        text: 'Advanced',
        items: [
          { text: 'You might not need this module', link: '/guide/advanced/you-might-not-need-post-processing' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://tresjs.org/discord' },
      { icon: 'github', link: 'https://github.com/Tresjs/post-processing' },
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ['vitepress'],
      include: ['three'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      dedupe: ['three', '@tresjs/core'],
    },
  },
  vue: {
    ...templateCompilerOptions,
  },
})
