// https://vitepress.dev/guide/custom-theme
import 'uno.css'
import Theme from 'vitepress/theme'
import './style.css'

import TresLayout from './TresLayout.vue'
import BloomDemo from './components/BloomDemo.vue'

export default {
  ...Theme,
  Layout: TresLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('BloomDemo', BloomDemo)
  },
}
