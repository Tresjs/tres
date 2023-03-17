import 'uno.css'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'

import StackBlitzEmbed from './components/StackBlitzEmbed.vue'
import TresLayout from './TresLayout.vue'

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('StackBlitzEmbed', StackBlitzEmbed)
  },
  Layout: TresLayout,
  /* Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h('div', null, 'Hello'),
    })
  }, */
}
