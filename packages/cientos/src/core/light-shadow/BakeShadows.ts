import { useTres } from '@tresjs/core'
import { WebGLRenderer } from 'three'
import { defineComponent, watchEffect } from 'vue'
import { useWebGPUSupportWarning } from '../../utils/useWebGPUSupportWarning'

export const BakeShadows = defineComponent({
  name: 'BakeShadows',

  setup() {
    useWebGPUSupportWarning('BakeShadows', 'uses the WebGLRenderer shadow map API, so it does nothing')
    const { renderer } = useTres()

    watchEffect(() => {
      if (renderer instanceof WebGLRenderer) {
        renderer.shadowMap.autoUpdate = false
        renderer.shadowMap.needsUpdate = true
      }
    })
  },
})
