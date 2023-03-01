import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitepress'

export const sharedConfig = defineConfig({
  title: 'TresJS',
  description: 'Declarative ThreeJS using Vue Components',
  head: [['link', { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      /*  { icon: 'github', link: 'https://github.com/tresjs/tres' }, */
      { icon: 'twitter', link: 'https://twitter.com/alvarosabu' },
    ],
  },
  vite: {
    plugins: [svgLoader(), Unocss()],
  },
})
