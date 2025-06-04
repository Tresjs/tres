import type { TresCanvasProps } from 'src/components/TresCanvas.vue'
import { createRenderer } from '../../core/createRenderer'
import { WebGLRenderer } from 'three'
import { setupWebGLRenderer } from '../../core/setupRenderer'
import { onUnmounted } from 'vue'
import type { RenderState, TresContext } from '../useTresContextProvider'
import type { EmitEventFn } from '../../types'

export type TresRendererSetupContext = Pick< // TODO make this public
  TresContext,
  'sizes' | 'scene' | 'camera' | 'canvas' | 'invalidate' | 'advance' | 'loop'
>

export async function useRenderer({
  emit,
  options,
  renderState, // TODO think about embedding this in this composable
  contextParts,
}: {
  emit: EmitEventFn
  options: TresCanvasProps
  renderState: RenderState
  contextParts: TresRendererSetupContext
}) {
  const renderer = await createRenderer(contextParts, options)

  // For now we only support WebGLRenderer. If the user wants to use their own renderer, it is their responsibility to handle the disposal and stuff like that.
  if (renderer instanceof WebGLRenderer) {
    setupWebGLRenderer(renderer, options, contextParts) // TODO use contents directly

    onUnmounted(() => {
      renderer.dispose()
      renderer.forceContextLoss()
    })
  }

  const { camera, scene } = contextParts

  contextParts.loop.register(() => {
    if (camera.value && renderState.frames.value > 0) {
      renderer.render(scene.value, camera.value)
      emit('render', renderer)
    }

    // Reset priority
    renderState.priority.value = 0

    if (renderState.mode.value === 'always') {
      renderState.frames.value = 1
    }
    else {
      renderState.frames.value = Math.max(0, renderState.frames.value - 1)
    }
  }, 'render')

  return renderer
}
