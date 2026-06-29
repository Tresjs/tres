<script lang="ts" setup>
import { useTres } from '@tresjs/core'
import { Refractor } from 'three-stdlib'
import { computed, onBeforeUnmount, shallowRef, toRefs, watch } from 'vue'
import { Color } from 'three'
import type { ColorRepresentation } from 'three'
import type { TresColor } from '@tresjs/core'

export interface RefractorProps {
  /**
   * The color tint of the refractor.
   *
   * @default '#7f7f7f'
   * @type {TresColor}
   * @memberof RefractorProps
   *
   */
  color?: TresColor
  /**
   * The textureWidth of the internal WebGLRenderTarget.
   *
   * @default 512
   * @type {number}
   * @memberof RefractorProps
   *
   */
  textureWidth?: number
  /**
   * The textureHeight of the internal WebGLRenderTarget.
   *
   * @default 512
   * @type {number}
   * @memberof RefractorProps
   *
   */
  textureHeight?: number
  /**
   * The clipBias.
   *
   * @default 0
   * @type {number}
   * @memberof RefractorProps
   *
   */
  clipBias?: number
  /**
   * The multisample.
   *
   * @default 4
   * @type {number}
   * @memberof RefractorProps
   *
   */
  multisample?: number
  /**
   * Custom shader.
   *
   * @default Refractor.RefractorShader
   * @type {object}
   * @memberof RefractorProps
   *
   */
  shader?: object
}

const props = withDefaults(defineProps<RefractorProps>(), {
  color: '#7f7f7f',
  textureWidth: 512,
  textureHeight: 512,
  clipBias: 0,
  multisample: 4,
  // @ts-expect-error: `RefractorShader` is not present in imported type but is present here:
  // https://github.com/mrdoob/three.js/blob/dev/examples/jsm/objects/Refractor.js
  shader: Refractor.RefractorShader,
})

const { extend, invalidate } = useTres()

const refractorRef = shallowRef<Refractor>()

extend({ Refractor })

const { color, textureWidth, textureHeight, clipBias, multisample, shader } = toRefs(
  props,
)

const colorValue = computed(() => new Color(color.value as ColorRepresentation))

watch(props, () => {
  invalidate()
})

onBeforeUnmount(() => {
  refractorRef.value?.dispose()
})

defineExpose({
  instance: refractorRef,
})
</script>

<template>
  <TresRefractor
    ref="refractorRef"
    :args="[undefined, { textureWidth,
                         textureHeight,
                         clipBias,
                         multisample,
                         shader }]"
    :material-uniforms-color-value="colorValue"
  >
    <slot>
      <TresPlaneGeometry :args="[5, 5]" />
    </slot>
  </TresRefractor>
</template>
