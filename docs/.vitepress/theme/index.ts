// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import TresLayout from './TresLayout.vue'
import 'uno.css'

import './style.css'

export default {
  ...Theme,
  Layout: TresLayout,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    /* ctx.app.use(plausible) */
  },
}
