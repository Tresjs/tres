// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import TreslechesLayout from './TreslechesLayout.vue'

import './style.css'
import 'uno.css'

export default {
  extends: Theme,
  Layout: TreslechesLayout,

}
