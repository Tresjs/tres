import { defineConfig } from 'vitepress'
import { enConfig } from './en'
import { esConfig } from './es'
import { frConfig } from './fr'
import { deConfig } from './de'
import { sharedConfig } from './shared'
import { zhConfig } from './zh' 
import { nlConfig } from './nl'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: 'English', lang: 'en-US', link: '/', ...enConfig },
    es: { label: 'Español', lang: 'es-ES', link: '/es/', ...esConfig },
    fr: { label: 'Français', lang: 'fr-FR', link: '/fr/', ...frConfig },
    de: { label: 'Deutsch', lang: 'de-DE', link: '/de/', ...deConfig },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/', ...zhConfig }, 
    nl: { label: 'Nederlands', lang: 'nl-NL', link: '/nl/', ...nlConfig },
  },
})
