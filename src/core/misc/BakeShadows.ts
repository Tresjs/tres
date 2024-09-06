import { useTresContext } from '@tresjs/core'
import { defineComponent, watchEffect } from 'vue'

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
