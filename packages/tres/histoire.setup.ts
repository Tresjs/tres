import { defineSetupVue3 } from '@histoire/plugin-vue'

import Tres from '@tresjs/core'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(Tres)
})
