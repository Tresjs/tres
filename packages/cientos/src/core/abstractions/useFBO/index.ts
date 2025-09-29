import { useLoop, useTres } from '@tresjs/core'
import { DepthTexture, FloatType, HalfFloatType, LinearFilter, WebGLRenderTarget } from 'three'
import { isReactive, onBeforeUnmount, reactive, ref, toRefs, watch } from 'vue'
import type { RenderTargetOptions } from 'three'
import type { Ref } from 'vue'

export interface FboOptions {
  /*
   * The width of the frame buffer object. Defaults to the width of the canvas.
   *
   * @type {number}
   * @memberof FboProps
   */
  width?: number

  /*
   * The height of the frame buffer object. Defaults to the height of the canvas.
   *
   * @type {number}
   * @memberof FboProps
   */
  height?: number

  /*
   * If set, the scene depth will be rendered into buffer.depthTexture.
   *
   * @default false
   * @type {boolean}
   * @memberof FboProps
   */
  depth?: boolean

  /*
   * Additional settings for the render target.
   * See https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget for more information.
   *
   * @default {}
   * @type {RenderTargetOptions}
   * @memberof FboProps
   */
  settings?: RenderTargetOptions

  /**
   * Whether to automatically render the FBO on the default scene.
   *
   *  @default true
   *  @type {boolean}
   *  @memberof FboProps
   */
  autoRender?: boolean
}

export function useFBO(options: FboOptions) {
  const target: Ref<WebGLRenderTarget | null> = ref(null)

  const { height, width, settings, depth, autoRender = ref(true) } = isReactive(options) ? toRefs(options) : toRefs(reactive(options))

  const { onBeforeRender } = useLoop()
  const { camera, renderer, scene, sizes, invalidate } = useTres()

  watch(() => [width?.value, sizes.width.value, height?.value, sizes.height.value], () => {
    target.value?.dispose()

    target.value = new WebGLRenderTarget(width?.value || sizes.width.value, height?.value || sizes.height.value, {
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
      renderer.setRenderTarget(target.value)
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
