import 'uno.css'

// .vitepress/theme/index.ts
import Theme from 'vitepress/theme'
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
  ...Theme,

  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    /* ctx.app.use(plausible) */
  },
  Layout: TresLayout,
}
