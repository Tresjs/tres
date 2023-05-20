import 'uno.css'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'

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
    /* ctx.app.use(plausible) */
  },
  Layout: TresLayout,
}
