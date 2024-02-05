import { defineConfig } from 'vitepress'
import { enConfig } from './en'
import { esConfig } from './es'
import { sharedConfig } from './shared'

/* import { zhConfig } from './zh' */

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: 'English', lang: 'en-US', link: '/', ...enConfig },
    es: { label: 'Español', lang: 'es-ES', link: '/es/', ...esConfig },
    /* zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/', ...zhConfig }, */
  },
})