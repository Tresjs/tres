import { defineConfig } from 'vitepress'
import { deConfig } from './de'
import { enConfig } from './en'
import { esConfig } from './es'
import { frConfig } from './fr'
import { nlConfig } from './nl'
import { sharedConfig } from './shared'
import { zhConfig } from './zh'

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
