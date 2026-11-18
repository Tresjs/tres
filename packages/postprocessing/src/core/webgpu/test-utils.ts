import { useRenderPipeline } from '@tresjs/core/webgpu'
import { PerspectiveCamera } from 'three'
import type { VNodeChild } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import { createStubRenderer, mountInTresContext } from '../../../../core/src/utils/test/tresContext'

export const flush = async () => {
  await nextTick()
  await nextTick()
}

// `render` mounts only on `show()`, so spies on the context can be set before the composer runs.
export function mountStubCanvas(render: () => VNodeChild) {
  // A zero-size canvas never reports ready, so the real loop does not draw with the stub renderer.
  const domElement = Object.assign(document.createElement('canvas'), { width: 0, height: 0 })
  const content = ref(false)
  const mounted = mountInTresContext(() => content.value ? render() : null, { renderer: createStubRenderer({ domElement }) })
  mounted.ctx.camera.registerCamera(new PerspectiveCamera(), true)

  const show = async () => {
    content.value = true
    await flush()
  }
  return { ...mounted, show }
}

export function createPipelineProbe() {
  let state: ReturnType<typeof useRenderPipeline> | undefined
  const Probe = defineComponent({
    setup() {
      state = useRenderPipeline()
      return () => null
    },
  })
  return { Probe, pipeline: () => state?.renderPipeline.value ?? undefined, passes: () => state!.passes }
}
