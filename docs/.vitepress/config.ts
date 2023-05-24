import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'pathe'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Post-processing',
  description: 'Post-processing effects for ViteJS',
  head: [['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Introduction', link: '/guide/' }],
      },
      {
        text: 'Effects',
        items: [
          { text: 'Bloom', link: '/guide/effects/bloom' },
          { text: 'Glitch', link: '/guide/effects/glitch' },
          { text: 'Outline', link: '/guide/effects/outline' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/tresjs_dev' },
      { icon: 'discord', link: 'https://discord.gg/UCr96AQmWn' },
    ],
  },
  vite: {
    plugins: [svgLoader(), Unocss()],
    resolve: {
      alias: {
        '/@': resolve(__dirname, '../../src'),
      },
    },
  },
})
