import { defineSetupVue3 } from '@histoire/plugin-vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Tres from './src'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(Tres, {
    prefix: 'Tres',
    extends: {
      OrbitControls,
    },
  })
})
