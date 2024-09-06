import VPTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import TresLayout from './TresLayout.vue'
import './custom.css'

import 'uno.css'

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
  ...VPTheme,

  /* enhanceApp(ctx) {
    ctx.app.use(plausible)
  }, */
  Layout: TresLayout,
} satisfies Theme
