import 'uno.css'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import EmbedExperiment from './components/EmbedExperiment.vue'

import StackBlitzEmbed from './components/StackBlitzEmbed.vue'
import TresLayout from './TresLayout.vue'

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('StackBlitzEmbed', StackBlitzEmbed)
    ctx.app.component('EmbedExperiment', EmbedExperiment)
  },
  Layout: TresLayout,
  /* Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h('div', null, 'Hello'),
    })
  }, */
}
