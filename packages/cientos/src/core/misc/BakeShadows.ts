import { useTres } from '@tresjs/core'
import { WebGLRenderer } from 'three'
import { defineComponent, watchEffect } from 'vue'

export const BakeShadows = defineComponent({
  name: 'BakeShadows',

  setup() {
    const { renderer } = useTres()

    watchEffect(() => {
      if (renderer instanceof WebGLRenderer) {
        renderer.shadowMap.autoUpdate = false
        renderer.shadowMap.needsUpdate = true
      }
    })
  },
})
