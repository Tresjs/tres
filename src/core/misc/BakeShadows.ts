import { defineComponent, watchEffect } from 'vue'
import { useTresContext } from '@tresjs/core'

export const BakeShadows = defineComponent({
  name: 'BakeShadows',

  setup() {
    const { renderer } = useTresContext()

    watchEffect(() => {
      renderer.value.shadowMap.autoUpdate = false
      renderer.value.shadowMap.needsUpdate = true
    })
  },
})
