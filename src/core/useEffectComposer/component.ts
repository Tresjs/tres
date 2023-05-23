import { useWindowSize } from '@vueuse/core'
import { useRenderLoop, Camera } from '@tresjs/core'
import { defineComponent, provide, shallowRef, ShallowRef, toRefs, watch, watchEffect } from 'vue'
import { DepthDownsamplingPass, EffectComposer as EffectComposerImpl, NormalPass, RenderPass } from 'postprocessing'
import { isWebGL2Available } from 'three-stdlib'

import { useCore } from '../useCore'
import { /* HalfFloatType, */ Scene } from 'three'

export interface EffectComposerProps {
  /**
   * The children of the effect composer.
   * @default []
   * @type {Array}
   * @memberof EffectComposerProps
   * @name children
   *
   **/
  children?: Array<any>
  /**
   * Whether the depth buffer is enabled.
   * @default true
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name depthBuffer
   *
   **/
  depthBuffer?: boolean
  /**
   *
   * @default false
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name dissableNormalPass
   *
   **/
  dissableNormalPass?: boolean
  /**
   *
   * Stencil buffer.
   *
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name stencilBuffer
   *
   **/
  stencilBuffer?: boolean
  /**
   *
   * Whether the effect composer should clear the buffers before rendering.
   *
   * @type {boolean}
   * @memberof EffectComposerProps
   * @name autoClear
   *
   **/
  autoClear?: boolean
  /**
   *
   * The resolution scale.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name resolutionScale
   *
   **/
  resolutionScale?: number
  /**
   *
   * The multisampling.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name multisampling
   *
   **/
  multisampling?: number
  /**
   *
   * The frame buffer type.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name frameBufferType
   *
   **/
  frameBufferType?: number

  /**
   *
   * The render priority.
   *
   * @type {number}
   * @memberof EffectComposerProps
   * @name renderPriority
   *
   **/
  renderPriority?: number
  /**
   *
   * A camera to use for rendering.
   *
   * @type {Camera}
   * @memberof EffectComposerProps
   * @name camera
   *
   **/
  camera?: Camera
  /**
   * A scene to use for rendering.
   * @type {Scene}
   * @memberof EffectComposerProps
   * @name scene
   *
   **/
  scene?: Scene
}

export const EffectComposer = defineComponent<EffectComposerProps>({
  name: 'EffectComposer',
  props: [
    'children',
    'depthBuffer',
    'dissableNormalPass',
    'stencilBuffer',
    'autoClear',
    'resolutionScale',
    'multisampling',
    'frameBufferType',
    'renderPriority',
    'camera',
    'scene',
  ] as unknown as undefined,

  setup(props, { slots }) {
    const { state } = useCore()
    const {
    // TODO: Add support for these props
    /*    renderPriority = 1,
      autoClear = true,
      multisampling = 8,
      frameBufferType = HalfFloatType, */
      resolutionScale,
    } = toRefs(props)
    const effectComposer: ShallowRef<EffectComposerImpl | null> = shallowRef(null)

    const scene = props.scene || state.scene
    const camera = props.camera || state.camera
    let downSamplingPass = null
    let normalPass = null
    const webGL2Available = isWebGL2Available()

    provide('effectComposer', effectComposer)

    const { width, height } = useWindowSize()

    function setNormalPass() {
      if (effectComposer.value) {
        normalPass = new NormalPass(scene as Scene, camera as Camera)
        normalPass.enabled = false
        effectComposer.value.addPass(normalPass)
        if (resolutionScale.value !== undefined && webGL2Available) {
          downSamplingPass = new DepthDownsamplingPass({
            normalBuffer: normalPass.texture,
            resolutionScale: resolutionScale?.value,
          })
          downSamplingPass.enabled = false
          effectComposer.value.addPass(downSamplingPass)
        }
      }
    }

    watchEffect(() => {
      if (state.renderer && state.scene && state.camera) {
        state.renderer.setSize(width.value, height.value)
        state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        effectComposer.value = new EffectComposerImpl(state.renderer)
        effectComposer.value.addPass(new RenderPass(scene, camera))

        if (!props.dissableNormalPass) {
          setNormalPass()
        }
      }
    })

    const { onLoop } = useRenderLoop()

    onLoop(() => {
      if (effectComposer.value) {
        effectComposer.value.render()
      }
    })

    return () => {
      return slots.default?.()
    }
  },
})
