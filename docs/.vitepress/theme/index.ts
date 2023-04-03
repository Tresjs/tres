import 'uno.css'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'
import { createPlausible } from '@huntersofbook/plausible-vue'

import StackBlitzEmbed from './components/StackBlitzEmbed.vue'
import EmbedExperiment from './components/EmbedExperiment.vue'

import TresLayout from './TresLayout.vue'

const plausible = createPlausible({
  init: {
    trackLocalhost: false,
  },
  settings: {
    enableAutoOutboundTracking: true,
    enableAutoPageviews: true,
  },
  partytown: false,
})

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('StackBlitzEmbed', StackBlitzEmbed)
    ctx.app.component('EmbedExperiment', EmbedExperiment)

    ctx.app.use(plausible)
  },
  Layout: TresLayout,
  /* Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h('div', null, 'Hello'),
    })
  }, */
}
