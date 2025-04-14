import type { TresCanvasProps } from 'src/components/TresCanvas.vue'
import { createRenderer } from 'src/core/createRenderer'
import type { TresRendererSetupContext } from '../../composables'
import { WebGLRenderer } from 'three'
import { setupWebGLRenderer } from 'src/core/setupRenderer'
import { onUnmounted } from 'vue'

export async function useRenderer({
  contextParts: ctx,
  options,
}: {
  contextParts: TresRendererSetupContext
  options: TresCanvasProps
}) {
  const renderer = await createRenderer(ctx, options)

  // For now we only support WebGLRenderer. If the user wants to use their own renderer, it is their responsibility to handle the disposal and stuff like that.
  if (renderer instanceof WebGLRenderer) {
    setupWebGLRenderer(renderer, options, ctx) // TODO use contents directly

    onUnmounted(() => {
      renderer.dispose()
      renderer.forceContextLoss()
    })
  }

  return renderer
}
