// https://vitepress.dev/guide/custom-theme
import 'uno.css'
import Theme from 'vitepress/theme'
import './style.css'

import TresLayout from './TresLayout.vue'

export default {
  ...Theme,
  Layout: TresLayout,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    /* ctx.app.use(plausible) */
  },
}
