import { resolve } from 'pathe'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'TresLeches 🍰',
  description: 'Tasty GUI for Vue controls',
  head: [

    ['link', {
      rel: 'icon',
      href: `data:image/svg+xml,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍰/text></svg>`,
    }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Controls', link: '/guide/controls' },
        ],
      },
      {
        text: 'Controls',
        link: '/controls',
        items: [
          { text: 'Boolean', link: '/controls/index.html#boolean' },
          { text: 'Number', link: '/controls/index.html#number' },
          { text: 'Text', link: '/controls/index.html#text' },
          { text: 'Color', link: '/controls/index.html#color' },
          { text: 'Range', link: '/controls/index.html#range' },
          { text: 'Select', link: '/controls/index.html#select' },
          { text: 'Vector', link: '/controls/index.html#vector' },
          { text: 'Button', link: '/controls/index.html#button' },
        ],
      },
      {
        text: 'Misc',
        link: '/misc',
        items: [
          { text: 'fpsgraph', link: '/misc/index.html#fpsgraph' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tresjs/leches' },
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
      alias: {
        '@tresjs/leches': resolve(__dirname, '../../dist/tresleches.js'),
        '@leches/styles': resolve(__dirname, '../../dist/style.css'),
      },
      dedupe: ['@tresjs/cientos', 'three'],
    },
  },
})
