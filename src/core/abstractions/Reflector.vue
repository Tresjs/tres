<script lang="ts" setup>
import { shallowRef, toRefs, watch } from 'vue'
import { useTresContext } from '@tresjs/core'
import type { TresColor } from '@tresjs/core'
import { Reflector } from 'three-stdlib'

export interface ReflectorProps {
  /**
   * The color of the reflector.
   *
   * @default '#333'
   * @type {TresColor}
   * @memberof ReflectorProps
   *
   */
  color?: TresColor
  /**
   * The textureWidth of the internal WebGLRenderTarget.
   *
   * @default window.innerWidth
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  textureWidth?: number
  /**
   * The textureHeight of the internal WebGLRenderTarget.
   *
   * @default window.innerHeight
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  textureHeight?: number
  /**
   * The clipBias.
   *
   * @default 0
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  clipBias?: number
  /**
   * The multisample.
   *
   * @default 4
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  multisample?: number
  /**
   * Custom shader.
   *
   * @default Reflector.ReflectorShader
   * @type {object}
   * @memberof ReflectorProps
   *
   */
  shader?: object
}

const props = withDefaults(defineProps<ReflectorProps>(), {
  color: '#333',
  textureWidth: 512,
  textureHeight: 512,
  clipBias: 0,
  multisample: 4,
  // @ts-expect-error: `ReflectorShader` is not present in imported type but is present here:
  // https://github.com/mrdoob/three.js/blob/dev/examples/jsm/objects/Reflector.js#L32
  shader: Reflector.ReflectorShader,
})

const { extend, invalidate } = useTresContext()

const reflectorRef = shallowRef<Reflector>()

extend({ Reflector })

const { color, textureWidth, textureHeight, clipBias, multisample, shader }
  = toRefs(props)

watch(props, () => invalidate())

defineExpose({
  instance: reflectorRef,
})
</script>

<template>
  <TresReflector
    ref="reflectorRef"
    :args="[undefined, { textureWidth, textureHeight, clipBias, multisample, shader }]"
    :material-uniforms-color-value="color"
  >
    <slot>
      <TresPlaneGeometry :args="[5, 5]" />
    </slot>
  </TresReflector>
</template>
