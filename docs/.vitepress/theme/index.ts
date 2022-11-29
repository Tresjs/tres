import Tres from '@tresjs/core'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('FirstScene', FirstScene)

    ctx.app.use(Tres)
  },
}
