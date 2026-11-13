import { useLoop, useTres } from '@tresjs/core'
import { DepthTexture, FloatType, HalfFloatType, LinearFilter } from 'three'
import { isReactive, onBeforeUnmount, reactive, ref, toRefs, watch } from 'vue'
// `RenderTarget` must stay a type-only import: three exports the class only from r155, and the root entry supports r133.
import type { RenderTarget, RenderTargetOptions, WebGLRenderTarget } from 'three'
import type { Ref } from 'vue'

export interface FboOptions {
  /**
   * The width of the frame buffer object. Defaults to the width of the canvas.
   */
  width?: number

  /**
   * The height of the frame buffer object. Defaults to the height of the canvas.
   */
  height?: number

  /**
   * If set, the scene depth will be rendered into buffer.depthTexture.
   *
   * @default false
   */
  depth?: boolean

  /**
   * Additional settings for the render target.
   * See https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget for more information.
   *
   * @default {}
   */
  settings?: RenderTargetOptions

  /**
   * Whether to automatically render the FBO on the default scene.
   *
   * @default true
   */
  autoRender?: boolean
}

type CreateFboTarget<T extends RenderTarget> = (width: number, height: number, options: RenderTargetOptions) => T

export function useFBOTarget<T extends RenderTarget>(options: FboOptions, createTarget: CreateFboTarget<T>) {
  const target: Ref<T | null> = ref(null)

  const { height, width, settings, depth, autoRender = ref(true) } = isReactive(options) ? toRefs(options) : toRefs(reactive(options))

  const { onBeforeRender } = useLoop()
  const { camera, renderer, scene, sizes, invalidate } = useTres()

  watch(() => [width?.value, sizes.width.value, height?.value, sizes.height.value], () => {
    target.value?.dispose()

    target.value = createTarget(width?.value || sizes.width.value, height?.value || sizes.height.value, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...settings?.value,
    })

    if (depth?.value) {
      target.value.depthTexture = new DepthTexture(
        width?.value || sizes.width.value,
        height?.value || sizes.height.value,
        FloatType,
      )
    }

    invalidate()
  }, { immediate: true })

  onBeforeRender(() => {
    if (autoRender.value) {
      // The renderer type is a union, so its parameter types intersect. Both renderers accept either target class.
      renderer.setRenderTarget(target.value as WebGLRenderTarget | null)
      renderer.clear()
      if (camera.value) {
        renderer.render(scene.value, camera.value)
      }

      renderer.setRenderTarget(null)
    }
  }, Number.POSITIVE_INFINITY)

  onBeforeUnmount(() => {
    target.value?.dispose()
  })

  return target
}
