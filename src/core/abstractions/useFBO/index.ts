import { useRenderLoop, useTresContext } from '@tresjs/core'
import type { Camera, WebGLRenderTargetOptions } from 'three'
import { DepthTexture, FloatType, HalfFloatType, LinearFilter, WebGLRenderTarget } from 'three'
import type { Ref } from 'vue'
import { isReactive, onBeforeUnmount, reactive, ref, toRefs, watchEffect } from 'vue'

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
   * @type {WebGLRenderTargetOptions}
   * @memberof FboProps
   */
  settings?: WebGLRenderTargetOptions
}

export function useFBO(options: FboOptions) {
  const target: Ref<WebGLRenderTarget | null> = ref(null)

  const { height, width, settings, depth } = isReactive(options) ? toRefs(options) : toRefs(reactive(options))

  const { onLoop } = useRenderLoop()
  const { camera, renderer, scene, sizes } = useTresContext()

  watchEffect(() => {
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
  })

  onLoop(() => {
    renderer.value.setRenderTarget(target.value)
    renderer.value.clear()
    renderer.value.render(scene.value, camera.value as Camera)

    renderer.value.setRenderTarget(null)
  })

  onBeforeUnmount(() => {
    target.value?.dispose()
  })

  return target
}
