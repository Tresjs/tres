import Tres from '@tresjs/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './config.css'
import FirstScene from './components/FirstScene.vue'
import FirstSceneLightToon from './components/FirstSceneLightToon.vue'
import ExtendExample from './components/ExtendExample.vue'
export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('FirstScene', FirstScene)
    ctx.app.component('FirstSceneLightToon', FirstSceneLightToon)
    ctx.app.component('ExtendExample', ExtendExample)
    ctx.app.use(Tres, {
      extends: {
        OrbitControls,
      },
    })
  },
}
