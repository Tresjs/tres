import type { Theme } from 'vitepress'
import VPTheme from 'vitepress/theme'

import 'uno.css'
import './custom.css'

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
  ...VPTheme,

  /* enhanceApp(ctx) {
    ctx.app.use(plausible)
  }, */
  Layout: TresLayout,
} satisfies Theme
