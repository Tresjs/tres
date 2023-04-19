import 'uno.css'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'

import StackBlitzEmbed from './components/StackBlitzEmbed.vue'
import EmbedExperiment from './components/EmbedExperiment.vue'
import DonutExample from './components/DonutExample.vue'

import TresLayout from './TresLayout.vue'

/* const plausible = createPlausible({
  init: {
    trackLocalhost: false,
  },
  settings: {
    enableAutoOutboundTracking: true,
    enableAutoPageviews: true,
  },
  partytown: false,
}) */

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('StackBlitzEmbed', StackBlitzEmbed)
    ctx.app.component('EmbedExperiment', EmbedExperiment)
    ctx.app.component('DonutExample', DonutExample)

    /* ctx.app.use(plausible) */
  },
  Layout: TresLayout,
}
