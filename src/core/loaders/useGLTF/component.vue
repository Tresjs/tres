<script setup lang="ts">
import { ref } from 'vue'
import type { TresObject } from '@tresjs/core'
import { useGLTF } from '.'

export interface GLTFModelProps {
  /**
   *
   * The path to the GLTF file.
   *
   * @type {string}
   * @required
   * @memberof GLTFModelProps
   *
   */
  path: string
  /**
   *
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  draco?: boolean
  /**
   *
   * Whether to use cast-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  castShadow?: boolean
  /**
   *
   * Whether to use receive-shadow to the model.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   */
  receiveShadow?: boolean
  /**
   *
   * The path to the Draco decoder.
   *
   * @type {string}
   * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
   * @memberof GLTFModelProps
   *
   */
  decoderPath?: string
}

const props = withDefaults(
  defineProps<{
    path: string
    draco?: boolean
    decoderPath?: string
    castShadow?: boolean
    receiveShadow?: boolean
  }>(),
  {
    draco: false,
    castShadow: false,
    receiveShadow: false,
    decoderPath: 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/',
  },
)
const modelRef = ref()

defineExpose({
  instance: modelRef,
})

const { scene: model } = await useGLTF(props.path as string, {
  draco: props.draco,
  decoderPath: props.decoderPath,
})
if (props.castShadow || props.receiveShadow) {
  model.traverse((child: TresObject) => {
    if (child.isMesh) {
      child.castShadow = props.castShadow
      child.receiveShadow = props.receiveShadow
    }
  })
}
</script>

<template>
  <primitive
    ref="modelRef"
    :object="model"
    v-bind="$attrs"
  />
</template>
