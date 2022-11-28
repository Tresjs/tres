import Tres from '@tresjs/core'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'
import FirstSceneLightToon from './components/FirstSceneLightToon.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('FirstSceneLightToon', FirstSceneLightToon)
    ctx.app.use(Tres)
  },
}
