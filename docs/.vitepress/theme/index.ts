import Tres from '@tresjs/core'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'
import StackBlitzEmbed from './components/StackBlitzEmbed.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('StackBlitzEmbed', StackBlitzEmbed)
    ctx.app.use(Tres)

    console.log(ctx)
  },
}
